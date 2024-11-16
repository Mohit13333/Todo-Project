import { createContext, useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

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
    setToken(null);
    localStorage.removeItem("token");
  };

  // Fetch user data after token is set
  useEffect(() => {
    if (!token) {
      setIsLoading(false); // If no token, don't try to fetch user data
      return;
    }

    const userAuthentication = async () => {
      try {
        setIsLoading(true); // Set loading true while fetching user data
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
          console.error("Failed to authenticate");
        }
      } catch (error) {
        console.error("Error while fetching data", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching user data
      }
    };

    userAuthentication();
  }, [token]); // Run only when token changes

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLs,
        LogoutUser,
        user,
        userAuthToken,
        isLoading,
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
