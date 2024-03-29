import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

@injectable()
class RentalDevolutionUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exists");
    }

    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let totalAmount = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      totalAmount = calculate_fine;
    }

    totalAmount += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = totalAmount;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { RentalDevolutionUseCase };
