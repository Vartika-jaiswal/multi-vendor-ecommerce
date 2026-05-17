import express from "express";

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


// CREATE PRODUCT
router.post(
  "/",
  protect,
  upload.single("image"),
  createProduct
);


// GET PRODUCTS
router.get(
  "/",
  getProducts
);


// UPDATE PRODUCT
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProduct
);


// DELETE PRODUCT
router.delete(
  "/:id",
  protect,
  deleteProduct
);

export default router;