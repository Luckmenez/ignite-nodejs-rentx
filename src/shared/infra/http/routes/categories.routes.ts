import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRoutes.post(
  "/",
  ensureAuthentication,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthentication,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
