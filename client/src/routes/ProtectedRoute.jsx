import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";


const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {

  const {
    user,
    loading,
  } = useAuth();


  if (loading) {

    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-[#6D5DF6] border-t-transparent rounded-full animate-spin"></div>
     </div>
    );
  }


  // NOT LOGGED IN
  if (!user) {

    return (
      <Navigate to="/login" />
    );
  }


  // ROLE CHECK
  if (
    allowedRoles &&
    !allowedRoles.includes(
      user.role
    )
  ) {

    return (
      <Navigate to="/login" />
    );
  }


  return children;
};

export default ProtectedRoute;