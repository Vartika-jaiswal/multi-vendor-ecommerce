import axios from "axios";

const API =
  "http://localhost:8000/api/orders";


// GET ORDERS
export const getOrders = async (
  page = 1,
  search = "",
  status = ""
) => {

  const { data } =
    await axios.get(API, {
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
      await axios.post(
        API,
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
      await axios.put(
        `${API}/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );

    return data;
  };