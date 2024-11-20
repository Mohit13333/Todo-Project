import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const userAuthToken = `Bearer ${token}`;

  // Store token in localStorage and update state
  const storeTokenInLs = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    // user authentication
    const userAuthentication = async () => {
      try {
        setIsLoading(true); 
        const response = await fetch(
          `/api/auth/user`,
          {
            method: "GET",
            headers: {
              Authorization: userAuthToken,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data.userData);
        } else {
          toast.error("Failed to authenticate");
        }
      } catch (error) {
        toast.error("Error while fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };

    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLs,
        LogoutUser,
        user,
        userAuthToken,
        isLoading,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
