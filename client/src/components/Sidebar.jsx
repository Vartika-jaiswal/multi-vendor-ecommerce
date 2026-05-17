import {
  NavLink,
} from "react-router-dom";

import {
  FaBox,
  FaShoppingCart,
  FaStore,
  FaChartBar,
  FaTimes,
} from "react-icons/fa";


const Sidebar = ({
  setSidebarOpen,
}) => {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaChartBar />,
    },

    {
      name: "Products",
      path: "/products",
      icon: <FaBox />,
    },

    {
      name: "Vendors",
      path: "/vendors",
      icon: <FaStore />,
    },

    {
      name: "Orders",
      path: "/orders",
      icon: <FaShoppingCart />,
    },
  ];


  return (
    <div className="w-[240px] h-screen bg-white border-r border-gray-200 p-4 flex flex-col">

      {/* TOP */}

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold text-[#6D5DF6]">
          AdminHub
        </h1>


        {/* MOBILE CLOSE */}

        <button
          onClick={() =>
            setSidebarOpen(false)
          }

          className="lg:hidden text-gray-600"
        >
          <FaTimes />
        </button>

      </div>


      {/* MENU */}

      <div className="space-y-2">

        {menuItems.map(
          (item) => (

            <NavLink
              key={item.name}

              to={item.path}

              onClick={() =>
                setSidebarOpen(false)
              }

              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-medium ${
                  isActive
                    ? "bg-[#6D5DF6] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#F3F4FF]"
                }`
              }
            >

              <span className="text-sm">
                {item.icon}
              </span>

              {item.name}

            </NavLink>
          )
        )}

      </div>

    </div>
  );
};

export default Sidebar;