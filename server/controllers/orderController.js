import Order from "../models/Order.js";


// CREATE ORDER
export const createOrder = async (req,res) => {
  try {
    const {
      products,
      totalAmount,
      customerName,
      customerEmail,
    } = req.body;

    const order = Order(req.body);
    const newOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL ORDERS
export const getOrders = async (
  req,
  res
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 5;

    const search =
      req.query.search || "";

    const status =
      req.query.status || "";


    let query = {};


    // SEARCH
    if (search) {
      query.customerName = {
        $regex: search,
        $options: "i",
      };
    }


    // STATUS FILTER
    if (status) {
      query.status = status;
    }


    const orders = await Order.find(query)
      .populate(
        "products.product",
        "title price image"
      )
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });


    const total =
      await Order.countDocuments(query);


    res.status(200).json({
      success: true,
      orders,

      currentPage: page,

      totalPages: Math.ceil(
        total / limit
      ),

      totalOrders: total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE ORDER STATUS
export const updateOrderStatus =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message:
          "Order status updated",

        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };