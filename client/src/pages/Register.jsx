import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import {
  useAuth,
} from "../context/AuthContext";


const Register = () => {

  const navigate =
    useNavigate();

  const { register } =
    useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "vendor",
    });


  // HANDLE CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  // SUBMIT

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ( !emailRegex.test(formData.email)) {
            return toast.error(
                "Enter valid email"
            );
        }
        await register( formData );
        toast.success(
          "Registration successful"
        );

        navigate("/login");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Registration failed"
        );

      } finally {

        setLoading(false);
      }
    };


  return (
    <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">

        {/* HEADER */}

        <div className="mb-4 text-center">

          <h1 className="text-3xl font-bold text-gray-800">
            Create Account 
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Register to continue
          </p>

        </div>


        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }

          className="space-y-4"
        >

          {/* NAME */}

          <div>

            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>

            <input
              type="text"

              name="name"

              placeholder="Enter your name"

              value={
                formData.name
              }

              onChange={
                handleChange
              }

              required

              className="w-full mt-1.5 px-3 py-2.5 rounded-lg border border-gray-200 bg-[#F8F8FC] outline-none focus:border-[#6D5DF6] text-sm"
            />

          </div>


          {/* EMAIL */}

          <div>

            <label className="text-sm font-medium text-gray-600">
              Email
            </label>

            <input
              type="email"

              name="email"

              placeholder="Enter your email"

              value={
                formData.email
              }

              onChange={
                handleChange
              }

              required

              className="w-full mt-1.5 px-3 py-2.5 rounded-lg border border-gray-200 bg-[#F8F8FC] outline-none focus:border-[#6D5DF6] text-sm"
            />

          </div>


          {/* PASSWORD */}

          <div>

            <label className="text-sm font-medium text-gray-600">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                name="password"

                placeholder="Enter password"

                value={
                  formData.password
                }

                onChange={
                  handleChange
                }

                required

                className="w-full mt-1.5 px-3 py-2.5 rounded-lg border border-gray-200 bg-[#F8F8FC] outline-none focus:border-[#6D5DF6] text-sm"
              />

              <button
                type="button"

                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }

                className="absolute right-4 top-5 text-gray-500"
              >
                {showPassword
                  ? <FiEyeOff />
                  : <FiEye />}
              </button>

            </div>

          </div>


          {/* ROLE */}

          <div>

            <label className="text-sm font-medium text-gray-600">
              Role
            </label>

            <select
              name="role"

              value={
                formData.role
              }

              onChange={
                handleChange
              }

              className="w-full mt-1.5 px-3 py-2.5 rounded-lg border border-gray-200 bg-[#F8F8FC] outline-none focus:border-[#6D5DF6] text-sm"
            >

              <option value="vendor">
                Vendor
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>


          {/* BUTTON */}

          <button
            type="submit"

            disabled={
              loading
            }

            className="w-full bg-[#6D5DF6] hover:bg-[#5B4BF0] text-white py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm"
          >

            {loading
              ? "Creating..."
              : "Register"}

          </button>

        </form>


        {/* LOGIN LINK */}

        <p className="text-center text-gray-500 mt-4 text-sm">

          Already have an account?
          {" "}

          <Link
            to="/login"

            className="text-[#6D5DF6] font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;