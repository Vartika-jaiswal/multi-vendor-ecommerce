import axios from "axios";
const API = "http://localhost:8000/api/products";

export const getProducts = async (
  page = 1,
  search = "",
  category = "",
  sort = "latest"
) => {
  const { data } = await axios.get(API, {
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
    const { data } = await axios.post(
        API,
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
    const { data } = await axios.put(
        `${API}/${id}`,
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
    const { data } = await axios.delete(
        `${API}/${id}`,
        {
          withCredentials: true,
        }
      );

    return data;
  };