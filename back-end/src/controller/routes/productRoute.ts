import express from "express";
import { ProductController } from "../productController";

export const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/", productController.getAllProducts)
productRouter.post("/insert", productController.insertProduct)
productRouter.post("/purchase", productController.purchaseShoppingList)
productRouter.put("/edit", productController.changeQty)
productRouter.delete("/delete/:id", productController.deleteProduct)