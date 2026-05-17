import {
  useAuth,
} from "../context/AuthContext";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaBars,
} from "react-icons/fa";


const Navbar = ({
  setSidebarOpen,
}) => {

  const {
    user,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();


  const handleLogout =
    async () => {

      await logout();

      navigate("/login");
    };


  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-5 py-3 flex items-center justify-between">

      {/* LEFT */}

      <div className="flex items-center gap-3">

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() =>
            setSidebarOpen(true)
          }

          className="lg:hidden text-gray-700 text-lg"
        >
          <FaBars />
        </button>


        <div>

          <h2 className="text-xl font-bold text-gray-800">
            Dashboard
          </h2>

          <p className="text-xs text-gray-500 mt-0.5">
            Welcome back,
            {" "}
            {user?.name}
          </p>

        </div>

      </div>


      {/* LOGOUT */}

      <button
        onClick={
          handleLogout
        }

        className="bg-[#6D5DF6] hover:bg-[#5B4BF0] text-white px-4 py-2 rounded-xl text-sm transition-all duration-300"
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;