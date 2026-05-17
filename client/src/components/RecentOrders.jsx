const RecentOrders = ({
  orders
}) => {
  return (
    <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Recent Orders
        </h2>

      </div>


      <div className="space-y-4">
        {orders?.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}

              className="flex items-center justify-between border-b border-gray-100 pb-4"
            >

              <div>

                <h3 className="font-semibold text-gray-800">
                  {order.customerName}
                </h3>

                <p className="text-sm text-gray-500">
                  {order.customerEmail}
                </p>

              </div>


              <div className="text-right">

                <p className="font-bold text-[#6D5DF6]">
                  ₹
                  {order.totalAmount}
                </p>

                <span className="text-sm text-gray-500">
                  {order.status}
                </span>

              </div>

            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No orders found
          </p>
        )}

      </div>
    </div>
  );
};

export default RecentOrders;