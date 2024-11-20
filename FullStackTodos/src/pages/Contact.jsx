import React, { useState } from "react";
import Footer from "../components/footer";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import Navbar from "../components/NavBar";

const Contact = () => {
  const [contact, setContact] = useState({
    userName: "",
    email: "",
    message: "",
  });
  const [userData, setUserData] = useState(true);
  const { user, userAuthToken } = useAuth();
  if (userData && user) {
    setContact({ userName: user.userName, email: user.email, message: "" });
    setUserData(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   Posting Contact Details to backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/admin/contact`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: userAuthToken,
          },
          body: JSON.stringify(contact),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setContact({
          userName: user ? user.userName : "",
          email: user ? user.email : "",
          message: "",
        });
        toast.success(data.message);
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    // contact section
    <>
      <Navbar />
      <section className="min-h-screen text-white flex flex-col justify-between">
        <main className="flex-grow flex justify-center items-center py-16 px-6">
          <div className="w-full max-w-5xl">
            <div className="md:grid md:grid-cols-2 md:gap-12">
              <div className="flex justify-center items-center mb-8 md:mb-0">
                <img
                  src="/images/support.png"
                  alt="Help"
                  className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-lg shadow-md object-contain"
                />
              </div>
              <div className="bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700">
                <h1 className="text-3xl font-bold text-center mb-6 relative">
                  Contact Us
                  <span className="absolute left-1/2 bottom-[-10px] transform -translate-x-1/2 w-1/4 h-[3px] bg-blue-500"></span>
                </h1>
                <form className="grid gap-6" onSubmit={handleFormSubmit}>
                  <div>
                    <label
                      htmlFor="userName"
                      className="block font-semibold mb-2"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      placeholder="Enter your username"
                      value={contact.userName}
                      onChange={handleInputChange}
                      required
                      autoComplete="off"
                      className="w-full bg-gray-100 text-black border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      value={contact.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="off"
                      className="w-full bg-gray-100 text-black border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-semibold mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Type your message"
                      value={contact.message}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-100 text-black border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                    ></textarea>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 text-lg font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
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

export default Contact;
