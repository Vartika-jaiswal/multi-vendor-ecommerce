import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  FaSearch,
  FaStore,
  FaEdit,
} from "react-icons/fa";

import {
  getVendors,
  toggleVendor,
} from "../services/vendorService";

import {
  toast,
} from "react-toastify";

import AddVendorModal from "../components/AddVendorModal";


const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [editVendor, setEditVendor] = useState(null);

  const fetchVendors = async () => {
      try {
        setLoading(true);
        const data = await getVendors( page,  search );
        setVendors(  data.vendors );
        setPages(data.totalPages);

      } catch (error) {

        toast.error(
          "Failed to load vendors"
        );

      } finally {
        setLoading(false);
      }
    };


 useEffect(() => {
  fetchVendors();
}, [page, search]);


  // BLOCK / UNBLOCK

  const handleToggle = async (id) => {
      try {
        const data = await toggleVendor(id);
        toast.success(
          data.message
        );
        fetchVendors();

      } catch (error) {
        toast.error(
          "Action failed"
        );
      }
    };


  // EDIT

  const handleEdit = (vendor) => {
      setEditVendor(vendor);
      setIsOpen(true);
    };


  return (

    <DashboardLayout>

      <div className="space-y-5">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Vendors
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage all vendors
            </p>

          </div>


          {/* ADD BUTTON */}

          <button
            onClick={() => {

              setEditVendor(null);

              setIsOpen(true);
            }}

            className="bg-[#6D5DF6] hover:bg-[#5B4BF0] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            Add Vendor
          </button>

        </div>


        {/* SEARCH */}

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">

          <FaSearch className="text-gray-400 text-sm" />

          <input
            type="text"

            placeholder="Search vendors..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            className="w-full bg-transparent outline-none text-sm"
          />

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="flex justify-center py-16">

            <div className="w-10 h-10 border-4 border-[#6D5DF6] border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : vendors.length === 0 ? (

          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

            <h2 className="text-2xl font-bold text-gray-700">
              No Vendors Found
            </h2>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {vendors.map(
              (vendor) => (

                <div
                  key={vendor._id}

                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
                >

                  {/* LEFT */}

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-[#F3F4FF] text-[#6D5DF6] flex items-center justify-center text-lg">
                      <FaStore />
                    </div>


                    <div>

                      <h2 className="text-lg font-bold text-gray-800">
                        {vendor.name}
                      </h2>

                      <p className="text-xs text-gray-500 mt-0.5">
                        {vendor.email}
                      </p>


                      <span
                        className={`inline-block mt-2 px-2 py-1 rounded-lg text-xs font-medium ${
                          vendor.isBlocked
                            ? "bg-red-100 text-red-500"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {vendor.isBlocked
                          ? "Blocked"
                          : "Active"}
                      </span>

                    </div>

                  </div>


                  {/* RIGHT */}

                  <div className="flex items-center gap-2">

                    {/* EDIT */}

                    <button
                      onClick={() =>
                        handleEdit(
                          vendor
                        )
                      }

                      className="w-9 h-9 rounded-xl bg-[#F3F4FF] text-[#6D5DF6] flex items-center justify-center hover:bg-[#6D5DF6] hover:text-white transition-all"
                    >
                      <FaEdit />
                    </button>


                    {/* BLOCK */}

                    <button
                      onClick={() =>
                        handleToggle(
                          vendor._id
                        )
                      }

                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        vendor.isBlocked
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {vendor.isBlocked
                        ? "Unblock"
                        : "Block"}
                    </button>

                  </div>

                </div>
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

      <AddVendorModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditVendor(null);
        }}
        fetchVendors={fetchVendors}
        editVendor={editVendor}
      />
    </DashboardLayout>
  );
};

export default Vendors;