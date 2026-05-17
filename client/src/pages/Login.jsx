import {
  useState
} from "react";

import {
    Link,
  useNavigate
} from "react-router-dom";

import {
  toast
} from "react-toastify";

import {
  useAuth
} from "../context/AuthContext";

import {
  FiEye,
  FiEyeOff
} from "react-icons/fi";


const Login = () => {
  const navigate = useNavigate();
  const { login } =useAuth();
  const [showPassword, setShowPassword] =  useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  const handleChange = (e) => {
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

      if ( !emailRegex.test(formData.email)) {
        return toast.error(
            "Enter valid email"
        );
      }
      const data = await login(
        formData.email,
        formData.password
      );

      toast.success(
        "Login successful"
      );

      if (data.user.role === "admin") {
        navigate("/");
      } else {
        toast.error(
            "Vendor panel not built yet"
        );

        return
    }

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">

        <div className="mb-5 text-center">

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back 
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>
        </div>


        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >

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

              className="w-full mt-2 px-2 py-2 rounded-lg border border-gray-200 bg-[#F8F8FC] outline-none focus:border-[#6D5DF6]"
            />
          </div>


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

                className="w-full mt-2 px-2 py-2 rounded-lg border border-gray-200 bg-[#F8F8FC] outline-none focus:border-[#6D5DF6]"
              />

              <button
                type="button"

                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }

                className="absolute right-5 top-6 text-gray-500"
              >
                {showPassword
                  ? <FiEyeOff />
                  : <FiEye />}
              </button>

            </div>
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6D5DF6] hover:bg-[#5B4BF0] text-white py-3 rounded-2xl font-semibold transition-all duration-300"
          >
            {loading
              ? "Loading..."
              : "Sign In"}
          </button>

        </form>
        <p className="text-center text-gray-500 mt-5 text-sm">

          Don't have an account?
          {" "}

          <Link
            to="/register"

            className="text-[#6D5DF6] font-semibold"
          >
            Register
          </Link>

        </p>
      </div>
    </div>
  );
};

export default Login;