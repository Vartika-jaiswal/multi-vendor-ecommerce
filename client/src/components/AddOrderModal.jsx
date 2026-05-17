import {
  useEffect,
  useState,
} from "react";

import Modal from "react-modal";

import {
  toast,
} from "react-toastify";

import {
  createOrder,
} from "../services/orderService";

import {
  getProducts,
} from "../services/productService";


Modal.setAppElement("#root");


const AddOrderModal = ({
  isOpen,
  onClose,
  fetchOrders,
}) => {

  const [loading, setLoading] =
    useState(false);

  const [products, setProducts] =
    useState([]);

  const [formData, setFormData] =
    useState({
      customerName: "",
      customerEmail: "",
      productId: "",
      quantity: 1,
    });


  // LOAD PRODUCTS
  useEffect(() => {

    const fetchProductsData =
      async () => {

        try {

          const data =
            await getProducts();

          setProducts(
            data.products
          );

        } catch (error) {
          console.log(error);
        }
      };

    if (isOpen) {
      fetchProductsData();
    }

  }, [isOpen]);


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  // SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const selectedProduct =
          products.find(
            (p) =>
              p._id ===
              formData.productId
          );

        const totalAmount =
          selectedProduct.price *
          formData.quantity;


        const orderData = {
          customerName:
            formData.customerName,

          customerEmail:
            formData.customerEmail,

          totalAmount,

          products: [
            {
              product:
                formData.productId,

              quantity:
                Number(
                  formData.quantity
                ),
            },
          ],
        };


        await createOrder(
          orderData
        );

        toast.success(
          "Order created"
        );

        fetchOrders();

        onClose();

      } catch (error) {

        toast.error(
          "Failed to create order"
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

      className="max-w-lg mx-auto mt-20 bg-white rounded-2xl p-6 outline-none"

      overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-start overflow-auto z-50"
    >

      <h2 className="text-2xl font-bold text-gray-800 mb-1">
        Create Order
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        Create dummy test order
      </p>


      <form
        onSubmit={
          handleSubmit
        }

        className="space-y-4"
      >

        <input
          type="text"

          name="customerName"

          placeholder="Customer name"

          value={
            formData.customerName
          }

          onChange={
            handleChange
          }

          required

          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm"
        />


        <input
          type="email"

          name="customerEmail"

          placeholder="Customer email"

          value={
            formData.customerEmail
          }

          onChange={
            handleChange
          }

          required

          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm"
        />


        <select
          name="productId"

          value={
            formData.productId
          }

          onChange={
            handleChange
          }

          required

          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm"
        >

          <option value="">
            Select Product
          </option>

          {products.map(
            (product) => (

              <option
                key={
                  product._id
                }

                value={
                  product._id
                }
              >
                {product.title}
              </option>
            )
          )}

        </select>


        <input
          type="number"

          name="quantity"

          min="1"

          placeholder="Quantity"

          value={
            formData.quantity
          }

          onChange={
            handleChange
          }

          required

          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm"
        />


        <div className="flex gap-3 pt-2">

          <button
            type="button"

            onClick={
              onClose
            }

            className="flex-1 border border-gray-200 py-3 rounded-xl text-sm"
          >
            Cancel
          </button>


          <button
            type="submit"

            disabled={loading}

            className="flex-1 bg-[#6D5DF6] text-white py-3 rounded-xl text-sm font-medium"
          >

            {loading
              ? "Creating..."
              : "Create Order"}

          </button>

        </div>

      </form>

    </Modal>
  );
};

export default AddOrderModal;