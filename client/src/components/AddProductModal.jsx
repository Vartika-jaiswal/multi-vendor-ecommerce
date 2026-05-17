import { useEffect, useState } from "react";
import Modal from "react-modal";
import { createProduct, updateProduct } from "../services/productService";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const AddProductModal = ({
  isOpen,
  onClose,
  fetchProducts,
  editProduct,
}) => {

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      price: "",
      discount: "",
      stock: "",
      category: "",
      image: null,
    });

  useEffect(() => {

    if (editProduct) {
      setFormData({
        title: editProduct.title || "",
        description: editProduct.description || "",
        price: editProduct.price || "",
        discount: editProduct.discount || "",
        stock: editProduct.stock || "",
        category: editProduct.category || "",
        image: null,
      });

      setPreview( `http://localhost:8000/${editProduct.image}` );

    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        discount: "",
        stock: "",
        category: "",
        image: null,
      });
      setPreview("");
    }

  }, [editProduct, isOpen]);


  const handleChange = (e) => {
    if (
      e.target.name === "image"
    ) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });

      if (file) {
        setPreview(
          URL.createObjectURL(
            file
          )
        );
      }

    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };


  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        const data = new FormData();
        Object.keys( formData ).forEach((key) => {

          if ( formData[key] !== null && formData[key] !== "" ) {
            data.append(
              key,
              formData[key]
            );
          }
        });

        if (editProduct) {
          await updateProduct( editProduct._id, data );
          toast.success(
            "Product updated successfully"
          );
        }

        else {
          await createProduct(data );
          toast.success(
            "Product added successfully"
          );
        }


        fetchProducts();

        onClose();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );

      } finally {

        setLoading(false);
      }
    };


  return (

    <Modal
      isOpen={isOpen}

      onRequestClose={
        onClose
      }

      className="max-w-lg mx-auto mt-10 bg-white rounded-2xl p-6 outline-none"

      overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-start overflow-auto z-50 px-4 py-10"
    >

      {/* HEADER */}

      <div className="mb-5">

        <h2 className="text-2xl font-bold text-gray-800">

          {editProduct
            ? "Edit Product"
            : "Add Product"}

        </h2>

        <p className="text-sm text-gray-500 mt-1">

          {editProduct
            ? "Update your product details"
            : "Create a new product"}

        </p>

      </div>


      {/* FORM */}

      <form
        onSubmit={
          handleSubmit
        }

        className="space-y-4"
      >

        {/* TITLE */}

        <input
          type="text"

          name="title"

          placeholder="Product title"

          value={
            formData.title
          }

          onChange={
            handleChange
          }

          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm focus:border-[#6D5DF6]"
        />


        {/* DESCRIPTION */}

        <textarea
          name="description"

          placeholder="Description"

          rows="3"

          value={
            formData.description
          }

          onChange={
            handleChange
          }

          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm resize-none focus:border-[#6D5DF6]"
        />


        {/* PRICE + DISCOUNT */}

        <div className="grid grid-cols-2 gap-3">

          <input
            type="number"

            name="price"

            placeholder="Price"

            value={
              formData.price
            }

            onChange={
              handleChange
            }

            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm focus:border-[#6D5DF6]"
          />


          <input
            type="number"

            name="discount"

            placeholder="Discount"

            value={
              formData.discount
            }

            onChange={
              handleChange
            }

            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm focus:border-[#6D5DF6]"
          />

        </div>


        {/* STOCK + CATEGORY */}

        <div className="grid grid-cols-2 gap-3">

          <input
            type="number"

            name="stock"

            placeholder="Stock"

            value={
              formData.stock
            }

            onChange={
              handleChange
            }

            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm focus:border-[#6D5DF6]"
          />


          <select
            name="category"

            value={
              formData.category
            }

            onChange={
              handleChange
            }

            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm focus:border-[#6D5DF6]"
          >

            <option value="">
              Select category
            </option>

            <option value="Mobile">
              Mobile
            </option>

            <option value="Laptop">
              Laptop
            </option>

            <option value="Fashion">
              Fashion
            </option>

          </select>

        </div>


        {/* IMAGE */}

        <div>

          <input
            type="file"

            name="image"

            accept="image/*"

            onChange={
              handleChange
            }

            className="w-full text-sm"
          />

          <p className="text-xs text-gray-400 mt-1">
            Upload product image
          </p>

        </div>


        {/* PREVIEW */}

        {preview && (

          <img
            src={preview}

            alt="preview"

            className="w-28 h-28 object-cover rounded-xl border border-gray-200"
          />

        )}


        {/* BUTTONS */}

        <div className="flex gap-3 pt-2">

          <button
            type="button"

            onClick={
              onClose
            }

            className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>


          <button
            type="submit"

            disabled={loading}

            className="flex-1 bg-[#6D5DF6] hover:bg-[#5B4BF0] text-white py-3 rounded-xl text-sm font-medium transition-all"
          >

            {loading
              ? editProduct
                ? "Updating..."
                : "Adding..."
              : editProduct
              ? "Update Product"
              : "Add Product"}

          </button>

        </div>

      </form>

    </Modal>
  );
};

export default AddProductModal;