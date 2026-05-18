import api from "./api";

export const getVendors = async (
    page = 1,
    search = ""
  ) => {
    const { data } = await api.get("/vendors", {
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
    const { data } = await api.post( "/vendors", vendorData,
        {
          withCredentials: true,
        }
      );

    return data;
  };

export const updateVendor = async (id, vendorData) => {
    const { data } = await api.put(`/vendors/${id}`, vendorData,
        {
          withCredentials: true,
        }
      );

    return data;
  };

export const toggleVendor = async (id) => {
    const { data } = await api.put(`/vendors/toggle/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
    return data;
  };