import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import ProductCard from "../components/ProductCard";

import AddProductModal from "../components/AddProductModal";

import {
  getProducts,
  deleteProduct,
} from "../services/productService";

import {
  toast,
} from "react-toastify";

import {
  FaSearch,
} from "react-icons/fa";


const Products = () => {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [editProduct, setEditProduct] = useState(null);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [sort, setSort] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pages, setPages] =
    useState(1);


  // FETCH PRODUCTS
  const fetchProducts =
    async () => {

      try {

        setLoading(true);

        const data =
          await getProducts(
            page,
            search,
            category,
            sort
          );

        setProducts(
          data.products
        );

        setPages(
          data.totalPages
        );

      } catch (error) {

        toast.error(
          "Failed to load products"
        );

      } finally {

        setLoading(false);
      }
    };


  useEffect(() => {

    fetchProducts();

  }, [
    page,
    search,
    category,
    sort,
  ]);


  // DELETE PRODUCT
  const handleDelete = async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteProduct(id);

        toast.success(
          "Product deleted"
        );

        fetchProducts();

      } catch (error) {

        toast.error(
          "Delete failed"
        );
      }
    };

const handleEdit = (product) => {
  setEditProduct(product);
  setIsOpen(true);
};


  return (
    <DashboardLayout>

      <div className="space-y-5">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Products
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your store products
            </p>

          </div>


          <button
            onClick={() => {
            setEditProduct(null);
            setIsOpen(true);
            }}

            className="bg-[#6D5DF6] hover:bg-[#5B4BF0] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            Add Product
          </button>

        </div>


        {/* FILTERS */}

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-3">

          {/* SEARCH */}

          <div className="flex-1 relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="text"

              placeholder="Search products..."

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm"
            />

          </div>


          {/* CATEGORY */}

          <select
            value={category}

            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }

            className="px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm"
          >

            <option value="">
              All Categories
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


          {/* SORT */}

          <select
            value={sort}

            onChange={(e) =>
              setSort(
                e.target.value
              )
            }

            className="px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm"
          >

            <option value="">
              Latest
            </option>

            <option value="low-high">
              Price Low-High
            </option>

            <option value="high-low">
              Price High-Low
            </option>

          </select>

        </div>


        {/* PRODUCTS */}

        {loading ? (

          <div className="flex justify-center py-16">

            <div className="w-10 h-10 border-4 border-[#6D5DF6] border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : products.length === 0 ? (

          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

            <h2 className="text-2xl font-bold text-gray-700">
              No Products Found
            </h2>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {products.map(
              (product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                  onEdit={ handleEdit }
                  onDelete={ handleDelete }
                />
              )
            )}

          </div>
        )}


        {/* PAGINATION */}

        <div className="flex items-center justify-center gap-3">

          <button
            disabled={page === 1}

            onClick={() =>
              setPage(
                page - 1
              )
            }

            className="px-4 py-2 rounded-xl bg-white border border-gray-200 disabled:opacity-50 text-sm"
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

            className="px-4 py-2 rounded-xl bg-white border border-gray-200 disabled:opacity-50 text-sm"
          >
            Next
          </button>

        </div>

      </div>


      {/* MODAL */}

      <AddProductModal
        isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setEditProduct(null);
        }}
        fetchProducts={
          fetchProducts
        }
        editProduct={editProduct}
      />

    </DashboardLayout>
  );
};

export default Products;