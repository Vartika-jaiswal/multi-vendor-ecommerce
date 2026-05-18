import api from "./api";


// GET ORDERS
export const getOrders = async (
  page = 1,
  search = "",
  status = ""
) => {

  const { data } =
    await api.get("/orders", {
      params: {
        page,
        search, 
        status,
      },

      withCredentials: true,
    });

  return data;
};


// CREATE ORDER
export const createOrder =
  async (orderData) => {

    const { data } =
      await api.post(
        "/orders",
        orderData,
        {
          withCredentials: true,
        }
      );

    return data;
  };


// UPDATE STATUS
export const updateOrderStatus =
  async (id, status) => {

    const { data } =
      await api.put(
        `/orders/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );

    return data;
  };