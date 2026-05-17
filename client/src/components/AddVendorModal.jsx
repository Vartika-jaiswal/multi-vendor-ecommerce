import {
  useEffect,
  useState,
} from "react";

import Modal from "react-modal";

import {
  toast,
} from "react-toastify";

import {
  createVendor,
  updateVendor,
} from "../services/vendorService";


Modal.setAppElement("#root");


const AddVendorModal = ({
  isOpen,
  onClose,
  fetchVendors,
  editVendor,
}) => {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });


  // PREFILL EDIT

  useEffect(() => {

    if (editVendor) {

      setFormData({
        name:
          editVendor.name || "",

        email:
          editVendor.email || "",

        password: "",
      });

    } else {

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }

  }, [
    editVendor,
    isOpen,
  ]);


  // HANDLE CHANGE

  const handleChange =
    (e) => {

      setFormData({
        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if ( !emailRegex.test( formData.email ) ) 
        {
        return toast.error(
            "Enter valid email"
        );
        }
        if (editVendor) {
          await updateVendor( editVendor._id,
            {
              name:
                formData.name,
              email:
                formData.email,
            }
          );
          toast.success(
            "Vendor updated"
          );

        }
        else {
          await createVendor( formData );
          toast.success(
            "Vendor created"
          );
        }
        fetchVendors();
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
      onRequestClose={ onClose }
      className="w-full max-w-md bg-white rounded-2xl p-6 outline-none shadow-xl my-10"
      overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50 overflow-y-auto"
    >

      <h2 className="text-xl font-bold text-gray-800 mb-1">
        {editVendor
          ? "Edit Vendor"
          : "Add Vendor"}
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        {editVendor
            ? "Update vendor details"
            : "Create new vendor"}
      </p>

      <form
        onSubmit={ handleSubmit }
        className="space-y-3"
      >
        <input
          type="text"
          name="name"
          placeholder="Vendor name"
          value={ formData.name} 
          onChange={ handleChange}
          required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm focus:border-[#6D5DF6]"
        />

        <input
          type="email"
          name="email"
          placeholder="Vendor email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm focus:border-[#6D5DF6]"
        />


        {!editVendor && (

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F8F8FC] outline-none text-sm focus:border-[#6D5DF6]"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#6D5DF6] text-white py-3 rounded-xl text-sm font-medium"
        >
          {loading
            ? "Saving..."
            : editVendor
            ? "Update Vendor"
            : "Add Vendor"}
        </button>

      </form>

    </Modal>
  );
};

export default AddVendorModal;