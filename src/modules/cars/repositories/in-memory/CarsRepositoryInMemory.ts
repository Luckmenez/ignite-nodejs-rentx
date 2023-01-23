import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  public cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      id,
    });

    this.cars.push(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const carAlreadyExists = await this.cars.find(
      (car) => license_plate === car.license_plate
    );
    return carAlreadyExists;
  }
  async findAvailable(
    name?: string,
    category_id?: string,
    brand?: string
  ): Promise<Car[]> {
    const carList = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (brand && car.brand === brand)
      ) {
        return car;
      }
      return null;
    });
    return carList;
  }
  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarsRepositoryInMemory };
