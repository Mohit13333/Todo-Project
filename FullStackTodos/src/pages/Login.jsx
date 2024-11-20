import React, { useState } from "react";
import Footer from "../components/footer";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import Navbar from "../components/NavBar";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLs, isLoading } = useAuth();
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Posting Login  details to backend and authorise to login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      if (response.ok) {
        storeTokenInLs(data.token);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  if (isLoading) {
    return (
      <section className="flex items-center justify-center h-screen">
        <div className="w-[100px] h-[100px] border-8 border-t-8 border-r-blue-600 border-t-green-600 border-l-rose-600 border-solid rounded-full animate-spin"></div>
      </section>
    );
  }
  return (
    // Login Section
    <>
      <Navbar />
      <section className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
        <main className="flex-grow flex justify-center items-center py-16 px-6">
          <div className="w-full max-w-5xl">
            <div className="md:grid md:grid-cols-2 md:gap-12">
              <div className="flex justify-center items-center mb-8 md:mb-0">
                <img
                  src="/images/login.png"
                  alt="A person trying to login"
                  className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-lg shadow-md object-contain"
                />
              </div>
              <div className="bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700">
                <h1 className="text-3xl font-bold text-center mb-6 relative">
                  Login
                  <span className="absolute left-1/2 bottom-[-10px] transform -translate-x-1/2 w-1/4 h-[3px] bg-blue-500"></span>
                </h1>
                <form onSubmit={handleSubmit} className="grid gap-6">
                  <div>
                    <label htmlFor="email" className="block font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      required
                      value={user.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 text-black border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block font-semibold mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      required
                      value={user.password}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 text-black border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 text-lg font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
                  >
                    Login Now
                  </button>
                  <p className="text-center">
                    Don't have an Account?
                    <NavLink
                      className="mx-2 w-full text-blue-500 py-3 text-lg font-medium rounded-lg  hover:text-blue-700 transition-colors"
                      to="/register"
                    >
                      Register.
                    </NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </section>
    </>
  );
};

export default Login;
