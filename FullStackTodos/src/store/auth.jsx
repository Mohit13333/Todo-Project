import { createContext, useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
  // const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  // services

  // useEffect(() => {
  //   const Service = async () => {
  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_BACKEND_URI}/api/todo/getTodos`,
  //         {
  //           method: "GET",
  //           header: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data);
  //         setServices(data.todosData);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   Service();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLs,
        LogoutUser,
        user,
        // services,
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
