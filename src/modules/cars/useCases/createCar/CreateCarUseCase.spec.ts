import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      brand: "brand",
      category_id: "Category",
      daily_rate: 1000,
      description: "Description",
      fine_amount: 500,
      license_plate: "XPTO",
      name: "name",
    });
    expect(car).toHaveProperty("id");
  });

  it("should not be possible to create a existent car", () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: "brand",
        category_id: "Category",
        daily_rate: 1000,
        description: "Description",
        fine_amount: 500,
        license_plate: "XPTO",
        name: "car1",
      });
      await createCarUseCase.execute({
        brand: "brand",
        category_id: "Category",
        daily_rate: 1000,
        description: "Description",
        fine_amount: 500,
        license_plate: "XPTO",
        name: "car2",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      brand: "brand",
      category_id: "Category",
      daily_rate: 1000,
      description: "Description",
      fine_amount: 500,
      license_plate: "XPTO12",
      name: "Car Available",
    });
    expect(car.available).toBe(true);
  });
});
