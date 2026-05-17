import Product from "../models/Product.js";

// ADD PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discount,
      stock,
      category,
    } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      discount,
      stock,
      category,

      image: req.file
        ? req.file.path
        : "",

      vendor: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 5;

    const search =
      req.query.search || "";

    const category =
      req.query.category || "";

    const sort =
      req.query.sort || "latest";


    let query = {};

    // SEARCH
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // CATEGORY FILTER
    if (category) {
      query.category = category;
    }


    // SORTING
    let sortOption = {};

    if (sort === "low-high") {
      sortOption.price = 1;
    } else if (sort === "high-low") {
      sortOption.price = -1;
    } else {
      sortOption.createdAt = -1;
    }


    const products = await Product.find(query)
      .populate("vendor", "name email")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortOption);


    const total =
      await Product.countDocuments(query);


    res.status(200).json({
      success: true,
      products,

      currentPage: page,

      totalPages: Math.ceil(
        total / limit
      ),

      totalProducts: total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE PRODUCT
export const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,

          image: req.file
            ? req.file.path
            : product.image,
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully",

      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE PRODUCT
export const deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }


    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};