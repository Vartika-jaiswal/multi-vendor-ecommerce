import axios from "axios";

const API = "http://localhost:8000/api/vendors";


export const getVendors = async (
    page = 1,
    search = ""
  ) => {
    const { data } = await axios.get(API, {
        params: {
          page,
          limit: 5,
          search,
        },
        withCredentials: true,
      });
    return data;
  };

export const createVendor = async (vendorData) => {
    const { data } = await axios.post( API, vendorData,
        {
          withCredentials: true,
        }
      );

    return data;
  };

export const updateVendor = async (id, vendorData) => {
    const { data } = await axios.put(`${API}/${id}`, vendorData,
        {
          withCredentials: true,
        }
      );

    return data;
  };

export const toggleVendor = async (id) => {
    const { data } = await axios.put(`${API}/toggle/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
    return data;
  };