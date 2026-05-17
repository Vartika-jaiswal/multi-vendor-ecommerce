import express from "express";
import {
  getVendors,
  toggleVendorStatus,
  createVendor,
  updateVendor,
} from "../controllers/vendorController.js";
import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  createVendor
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateVendor
);

router.get(
  "/",
  protect,
  adminOnly,
  getVendors
);

router.put(
  "/toggle/:id",
  protect,
  adminOnly,
  toggleVendorStatus
);

export default router;