import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";  // Import useNavigate
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const UpdateDetails = () => {
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const {userAuthToken}=useAuth();
  const params = useParams();
  const navigate = useNavigate();  // Use the useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handling task updation
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo/updateTodos/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: userAuthToken, // Uncomment if using authorization
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        navigate("/");  // Navigate to the main page after successful update
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <section>
        <main className="w-full">
          <div className="mx-auto max-w-screen-xl py-[4rem] px-[2.4rem]">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h1 className="text-3xl font-semibold text-center mb-6 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-[fit] after:h-[0.5rem] after:bg-blue-500">
                Update Details
              </h1>
              <form
                action=""
                className="grid grid-flow-row gap-6"
                onSubmit={handleFormSubmit}
              >
                {/* Title Input */}
                <div className="space-y-2">
                  <label htmlFor="userName" className="text-lg font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={updatedData.title}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    className="w-full bg-gray-100 border text-black border-blue-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-lg font-medium">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={updatedData.description}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    className="w-full bg-gray-100 border text-black border-blue-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Due Date Input */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-lg font-medium">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    placeholder="Due Date"
                    value={updatedData.dueDate}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    className="w-full bg-gray-100 border text-black border-blue-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-blue-800 py-4 px-9 font-medium text-lg capitalize rounded-lg border border-transparent cursor-pointer hover:bg-blue-700 transition-all duration-300 ease-in-out"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default UpdateDetails;
