import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarSpecification: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecification = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should be able to add a car specification", async () => {
    const car = await carsRepositoryInMemory.create({
      id: "8e9f1c9a-c589-47ad-9611-288a5a62cd43",
      brand: "brand",
      category_id: "Category",
      daily_rate: 1000,
      description: "Description",
      fine_amount: 500,
      license_plate: "XPTO",
      name: "name",
    });
    const specification = await specificationRepositoryInMemory.create({
      description: "test",
      name: "test_name",
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecification.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it("should not be able to add a car specification on a non existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];
    await expect(
      createCarSpecification.execute({ car_id, specifications_id })
    ).rejects.toEqual(new AppError("car does not exists!"));
  });
});
