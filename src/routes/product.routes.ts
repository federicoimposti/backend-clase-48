import { Router } from "../../deps.ts";
import {
  findAll,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../handlers/product.handler.ts";

export const router = new Router()
  .get("/api/products", findAll)
  .get("/api/products/:productId", findProduct)
  .post("/api/products", createProduct)
  .put("/api/products/:productId", updateProduct)
  .delete("/api/products/:productId", deleteProduct);