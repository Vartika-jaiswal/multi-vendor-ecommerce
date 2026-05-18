import api from "./api";

export const getProducts = async (
  page = 1,
  search = "",
  category = "",
  sort = "latest"
) => {
  const { data } = await api.get("/products", {
      params: {
        page,
        search,
        category,
        sort,
      },
      withCredentials: true,
    });
  return data;
};


export const createProduct = async (formData) => {
    const { data } = await api.post(
        "/products",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
          withCredentials: true,
        }
      );

    return data;
  };


export const updateProduct = async (id, formData) => {
    const { data } = await api.put(
        `/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
          withCredentials: true,
        }
      );

    return data;
  };

export const deleteProduct =async (id) => {
    const { data } = await api.delete(
        `/products/${id}`,
        {
          withCredentials: true,
        }
      );

    return data;
  };