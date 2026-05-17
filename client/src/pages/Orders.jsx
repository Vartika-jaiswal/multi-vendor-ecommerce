import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getOrders,
  updateOrderStatus,
} from "../services/orderService";

import {
  FaSearch,
} from "react-icons/fa";

import { toast } from "react-toastify";

import AddOrderModal from "../components/AddOrderModal";


const Orders = () => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pages, setPages] =
    useState(1);

  const [isOpen, setIsOpen] =
    useState(false);


  // FETCH ORDERS

  const fetchOrders =
    async () => {

      try {

        setLoading(true);

        const data =
          await getOrders(
            page,
            search,
            status
          );

        setOrders(
          data.orders
        );

        setPages(
          data.totalPages
        );

      } catch (error) {

        toast.error(
          "Failed to load orders"
        );

      } finally {

        setLoading(false);
      }
    };


  useEffect(() => {

    fetchOrders();

  }, [
    page,
    search,
    status,
  ]);


  // UPDATE STATUS

  const handleStatusChange =
    async (
      id,
      newStatus
    ) => {

      try {

        await updateOrderStatus(
          id,
          newStatus
        );

        toast.success(
          "Order updated"
        );

        fetchOrders();

      } catch (error) {

        toast.error(
          "Update failed"
        );
      }
    };


  return (
    <DashboardLayout>

      <div className="space-y-4">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

          <div>

            <h1 className="text-2xl font-bold text-gray-800">
              Orders
            </h1>

            <p className="text-sm text-gray-500 mt-0.5">
              Manage customer orders
            </p>

          </div>


          <button
            onClick={() =>
              setIsOpen(true)
            }

            className="bg-[#6D5DF6] hover:bg-[#5B4BF0] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            Create Dummy Order
          </button>

        </div>


        {/* FILTERS */}

        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-3">

          {/* SEARCH */}

          <div className="flex-1 relative">

            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="text"

              placeholder="Search customer..."

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 bg-[#F8F8FC] outline-none text-sm"
            />

          </div>


          {/* STATUS */}

          <select
            value={status}

            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }

            className="px-3 py-2.5 rounded-lg border border-gray-200 bg-[#F8F8FC] outline-none text-sm"
          >

            <option value="">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Delivered">
              Delivered
            </option>

          </select>

        </div>


        {/* ORDERS */}

        {loading ? (

          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-[#6D5DF6] border-t-transparent rounded-full animate-spin"></div>
          </div>

        ) : orders.length === 0 ? (

          <div className="bg-white p-6 rounded-xl text-center shadow-sm">

            <h2 className="text-lg font-semibold text-gray-700">
              No Orders Found
            </h2>

          </div>

        ) : (

          <div className="space-y-3">

            {orders.map((order) => (

              <div
                key={order._id}

                className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                  {/* LEFT */}

                  <div className="min-w-0">

                    <h2 className="text-lg font-semibold text-gray-800">
                      {order.customerName}
                    </h2>

                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.customerEmail}
                    </p>

                    <p className="mt-2 text-[#6D5DF6] font-bold text-base">
                      ₹{order.totalAmount}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2">

                      {order.products.map(
                        (item) => (

                          <span
                            key={item._id}

                            className="px-2 py-0.5 bg-[#F3F4FF] text-[#6D5DF6] rounded-md text-xs"
                          >
                            {
                              item.product?.title
                            }
                            {" "}
                            x
                            {
                              item.quantity
                            }
                          </span>
                        )
                      )}

                    </div>

                  </div>


                  {/* RIGHT */}

                  <div className="flex flex-row lg:flex-col items-start lg:items-end gap-2">

                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        order.status ===
                        "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status ===
                            "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {order.status}
                    </span>


                    <select
                      value={order.status}

                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }

                      className="px-3 py-1.5 rounded-lg border border-gray-200 outline-none text-sm bg-white"
                    >

                      <option>
                        Pending
                      </option>

                      <option>
                        Processing
                      </option>

                      <option>
                        Shipped
                      </option>

                      <option>
                        Delivered
                      </option>

                    </select>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* PAGINATION */}

        <div className="flex items-center justify-center gap-2 pt-1">

          <button
            disabled={page === 1}

            onClick={() =>
              setPage(
                page - 1
              )
            }

            className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 disabled:opacity-50 text-sm"
          >
            Prev
          </button>


          <span className="font-medium text-gray-700 text-sm">
            {page} / {pages}
          </span>


          <button
            disabled={page === pages}

            onClick={() =>
              setPage(
                page + 1
              )
            }

            className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 disabled:opacity-50 text-sm"
          >
            Next
          </button>

        </div>

      </div>

      {/* ADD ORDER MODAL */}

      <AddOrderModal
        isOpen={isOpen}

        onClose={() =>
          setIsOpen(false)
        }

        fetchOrders={
          fetchOrders
        }
      />

    </DashboardLayout>
  );
};

export default Orders;