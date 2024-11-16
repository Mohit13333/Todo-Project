import { createContext, useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  // const [usersAllData, setUsersAllData] = useState([])
  const userAuthToken = `Bearer ${token}`;
  const storeTokenInLs = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
  const isLoggedIn = !!token;
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  // Authentication
  useEffect(() => {
    const userAuthentication = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/user`, {
          method: "GET",
          // headers: {
          //   // Authorization: userAuthToken,
          // },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.userData);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error while fetching data");
      }
    };
    userAuthentication();
  }, []);

  useEffect(() => {
    const Service = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/todo/getTodos`,
          {
            method: "GET",
            header: {
              // Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setServices(data.todosData);
          // console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    Service();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLs,
        LogoutUser,
        user,
        userAuthToken,
        isLoading,
        services,
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