import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";


// DASHBOARD STATS
export const getDashboardStats =
  async (req, res) => {
    try {
      const totalVendors = await User.countDocuments({
          role: "vendor",
        });

      const totalProducts = await Product.countDocuments();
      const totalOrders = await Order.countDocuments();

      // TOTAL REVENUE
      const revenueResult =
        await Order.aggregate([
          {
            $group: {
              _id: null,

              totalRevenue: {
                $sum: "$totalAmount",
              },
            },
          },
        ]);


      const totalRevenue = revenueResult[0]?.totalRevenue || 0;

      // MONTHLY REVENUE GRAPH
      const monthlyRevenue =
        await Order.aggregate([
          {
            $group: {
              _id: {
                month: {
                  $month: "$createdAt",
                },
              },
              revenue: {
                $sum: "$totalAmount",
              },
            },
          },

          {
            $sort: {
              "_id.month": 1,
            },
          },
        ]);
      
      const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
      
      res.status(200).json({
        success: true,
        totalVendors,
        totalProducts,
        totalOrders,
        totalRevenue,
        monthlyRevenue,
        recentOrders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };