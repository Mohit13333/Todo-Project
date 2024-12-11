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
          `${import.meta.env.VITE_BACKEND_URI}/api/auth/user`,
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

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <div className="w-[100px] h-[100px] border-8 border-t-8 border-r-blue-600 border-t-green-600 border-l-rose-600 border-solid rounded-full animate-spin"></div>
        <p className="text-md m-2 text-white">
        Establishing connection, please wait...
        </p>
      </section>
    );
  }

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
