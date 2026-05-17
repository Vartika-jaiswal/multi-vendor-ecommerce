import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import RecentOrders from "../components/RecentOrders";

import {
  getDashboardStats,
} from "../services/dashboardService";

import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";


const Dashboard = () => {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // FETCH DASHBOARD
  const fetchDashboard =
    async () => {

      try {

        const data =
          await getDashboardStats();

        setStats(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  useEffect(() => {

    fetchDashboard();

  }, []);


  // LOADING
  if (loading) {

    return (
      <DashboardLayout>

        <div className="flex justify-center py-16">

          <div className="w-10 h-10 border-4 border-[#6D5DF6] border-t-transparent rounded-full animate-spin"></div>

        </div>

      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>

      <div className="space-y-5">

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          <StatCard
            title="Total Vendors"

            value={
              stats?.totalVendors || 0
            }

            icon={<FaUsers />}

            color="bg-[#6D5DF6]"
          />


          <StatCard
            title="Products"

            value={
              stats?.totalProducts || 0
            }

            icon={<FaBox />}

            color="bg-[#8B7CFF]"
          />


          <StatCard
            title="Orders"

            value={
              stats?.totalOrders || 0
            }

            icon={
              <FaShoppingCart />
            }

            color="bg-[#A78BFA]"
          />


          <StatCard
            title="Revenue"

            value={`₹${stats?.totalRevenue || 0}`}

            icon={
              <FaRupeeSign />
            }

            color="bg-[#C4B5FD]"
          />

        </div>


        {/* CHART + RECENT ORDERS */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          <div className="xl:col-span-2">

            <RevenueChart
              monthlyRevenue={
                stats?.monthlyRevenue || []
              }
            />

          </div>


          <RecentOrders
            orders={
              stats?.recentOrders || []
            }
          />

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;