import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars cars", async () => {
    // needs implementation
    const car1 = await carsRepositoryInMemory.create({
      brand: "Audi",
      category_id: "4e38151d-204d-4546-812d-f21ec2e55ab7",
      daily_rate: 600.0,
      description: "Carro Esportivo de Luxo",
      fine_amount: 50.0,
      license_plate: "XPTO1234",
      name: "A1",
    });
    const car2 = await carsRepositoryInMemory.create({
      brand: "Ferrari",
      category_id: "4e38151d-204d-4546-812d-f21ec2e55ab7",
      daily_rate: 800.0,
      description: "Carro Esportivo de Luxo",
      fine_amount: 50.0,
      license_plate: "XPTO0123",
      name: "Maranello",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Audi",
      category_id: "4e38151d-204d-4546-812d-f21ec2e55ab7",
      name: "A1",
    });

    expect(cars).toEqual([car1, car2]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Ferrari_test",
      category_id: "4e38151d-204d-4546-812d-f21ec2e55ab7",
      daily_rate: 800.0,
      description: "Carro Esportivo de Luxo",
      fine_amount: 50.0,
      license_plate: "XPTO0123",
      name: "Maranello",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Ferrari_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Ferrari_test2",
      category_id: "4e38151d-204d-4546-812d-f21ec2e55ab7",
      daily_rate: 800.0,
      description: "Carro Esportivo de Luxo",
      fine_amount: 50.0,
      license_plate: "XPTO0123",
      name: "Maranello_test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Maranello_test2",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category id", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Ferrari_test3",
      category_id: "69f1f100-d816-49f5-b601-59c2745ee5bd",
      daily_rate: 800.0,
      description: "Carro Esportivo de Luxo",
      fine_amount: 50.0,
      license_plate: "XPTO0123",
      name: "Maranello_test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "4e38151d-204d-4546-812d-f21ec2e55ab7",
    });

    expect(cars).toEqual([car]);
  });
});
