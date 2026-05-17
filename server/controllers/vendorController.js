import User from "../models/User.js";
import bcrypt from "bcryptjs";

// CREATE VENDOR
export const createVendor =async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      const existingVendor = await User.findOne({email });

      if (existingVendor) {
        return res.status(400).json({
          success: false,
          message:
            "Vendor already exists",
        });
      }

      const hashedPassword = await bcrypt.hash( password, 10);

      const vendor = await User.create({
          name,
          email,
          password: hashedPassword,
          role: "vendor",
        });

      res.status(201).json({
        success: true,
        message: "Vendor created successfully",
        vendor,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// GET ALL VENDORS
export const getVendors = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 5;

    const search = req.query.search || "";

    const query = {
      role: "vendor",
      name: {
        $regex: search,
        $options: "i",
      },
    };

    const vendors = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      vendors,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE VENDOR
export const updateVendor = async (req, res) => {
    try {
      const vendor = await User.findById( req.params.id );

      if (!vendor) {
        return res.status(404).json({
          success: false,
          message:
            "Vendor not found",
        });
      }

      vendor.name = req.body.name || vendor.name;
      vendor.email = req.body.email || vendor.email;
      await vendor.save();

      res.status(200).json({
        success: true,
        message: "Vendor updated successfully",
        vendor,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// BLOCK / UNBLOCK VENDOR
export const toggleVendorStatus = async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    vendor.isBlocked = !vendor.isBlocked;

    await vendor.save();

    res.status(200).json({
      success: true,
      message: vendor.isBlocked
        ? "Vendor blocked"
        : "Vendor unblocked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};