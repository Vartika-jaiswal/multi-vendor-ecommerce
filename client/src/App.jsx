import { Routes,Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Products from "./pages/Products";
import Vendors from "./pages/Vendors";
import Orders from "./pages/Orders";


function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendors"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <Vendors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;