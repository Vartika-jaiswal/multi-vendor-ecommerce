import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // CHECK AUTH
  const checkAuth = async () => {
    try {
      const { data } = await api.get( "/auth/me");
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  // REGISTER
    const register = async (
    userData
    ) => {

    const { data } =
        await api.post(
        "/auth/register",
        userData
        );

    return data;
    };

  // LOGIN
  const login = async (email, password) => {
    const { data } = await api.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    setUser(data.user);

    return data;
  };


  // LOGOUT
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };


  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);