import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("RentalsRepository")
    private RentalsRepository: IRentalsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentTimeInHours = 24;
    const carUnavailable = await this.RentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("this car is unavailable");
    }

    const rentalOpenToUser = await this.RentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("there's a rental in progress for this user");
    }

    const dateNow = this.dateProvider.dateNow();

    const compareDate = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compareDate < minimumRentTimeInHours) {
      throw new AppError("Couldn't rent a car with less than 24 hours");
    }

    const rental = await this.RentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
