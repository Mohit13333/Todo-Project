import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/NavBar";

const Todos = () => {
  const [dateTime, setDateTime] = useState("");
  const [services, setServices] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const { userAuthToken, token, storeTokenInLs, isLoggedIn } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  // Handling task posting
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: userAuthToken,
          },
          body: JSON.stringify(task),
        }
      );
      const data = await response.json();
      if (response.ok) {
        storeTokenInLs(token);
        setTask({
          title: "",
          description: "",
          dueDate: "",
        });
        toast.success(data.message);
        fetchTodos();
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      toast.error("Error adding task: " + error.message);
    }
  };

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo/getTodos`,
        {
          method: "GET",
          headers: {
            Authorization: userAuthToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setServices(data.todosData || []);
      } else {
        toast.error(data.message || "Failed to fetch tasks.");
      }
    } catch (error) {
      toast.error("Error fetching tasks: " + error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Delete task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo/deleteTodos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: userAuthToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        fetchTodos();
      } else {
        toast.error(data.message || "Failed to delete task.");
      }
    } catch (error) {
      toast.error("Error deleting task: " + error.message);
    }
  };

  // Toggle task completion
  const handleToggleCheck = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo/toggleCheck/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: userAuthToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Task status updated.");
        fetchTodos();
      } else {
        toast.error(data.message || "Failed to update task status.");
      }
    } catch (error) {
      toast.error("Error toggling task status: " + error.message);
    }
  };

  // Fetch sorted tasks
  const fetchSortedTasks = async (dueTask, checkedTask) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/todo/getSortedTodos?dueTask=${dueTask}&checkedTask=${checkedTask}`,
        {
          method: "GET",
          headers: {
            Authorization: userAuthToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok && Array.isArray(data.todos)) {
        setServices(data.todos);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Error fetching sorted tasks: " + error.message);
    }
  };

  // Display date and time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(`${now.toDateString()} - ${now.toLocaleTimeString()}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      {isLoggedIn ? (
        <>
          <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            <div className="flex-grow">
              <header className="p-6">
                <h1 className="font-bold mt-20 text-center text-4xl sm:text-5xl">
                  Todo List
                </h1>
              </header>
              <h2 className="mt-4 font-semibold text-center text-xl sm:text-2xl">
                {dateTime}
              </h2>
              <section>
                <main className="w-full">
                  <div className="mx-auto max-w-screen-xl py-[4rem] px-[2.4rem]">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                      <h1 className="text-black text-3xl font-bold text-center mb-6 relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-[fit] after:h-[0.5rem] after:bg-blue-500">
                        Add Task
                      </h1>
                      <form
                        action=""
                        className="grid grid-flow-row gap-6"
                        onSubmit={handleFormSubmit}
                      >
                        <div className="space-y-2">
                          <label
                            htmlFor="title"
                            className="text-black text-lg font-medium"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={task.title}
                            onChange={handleInputChange}
                            required
                            autoComplete="off"
                            className="w-full bg-gray-100 border text-black border-blue-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="description"
                            className="text-black text-lg font-medium"
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={task.description}
                            onChange={handleInputChange}
                            required
                            autoComplete="off"
                            className="w-full bg-gray-100 border text-black border-blue-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="dueDate"
                            className="text-black text-lg font-medium"
                          >
                            Due Date
                          </label>
                          <input
                            type="date"
                            name="dueDate"
                            placeholder="Due Date"
                            value={task.dueDate}
                            onChange={handleInputChange}
                            required
                            autoComplete="off"
                            className="w-full bg-gray-100 border text-black border-blue-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mt-6 flex justify-center">
                          <button
                            type="submit"
                            className="w-full sm:w-auto bg-indigo-800 border-0 py-3 px-6 rounded-md text-white font-semibold text-lg text-center focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50 hover:bg-indigo-600 hover:scale-105 transition duration-300 ease-in-out"
                          >
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </main>
              </section>
              <section className="mx-auto max-w-screen-xl p-3">
                <div className="flex justify-center">
                  <select
                    className="w-full sm:w-auto text-white border-2 border-gray-500 rounded-lg p-3 bg-gray-900 text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 hover:bg-gray-800 transition duration-200 ease-in-out"
                    onChange={(e) => {
                      const [checkedTask, dueTask] = e.target.value.split(",");
                      if (checkedTask && dueTask) {
                        fetchSortedTasks(checkedTask, dueTask);
                      }
                    }}
                  >
                    <option className="text-gray-700 bg-gray-200">
                      Select Sorting Option
                    </option>
                    <option value="dueDate,asc">By Earliest Due Date</option>
                    <option value="dueDate,desc">By Late Due Date</option>
                    <option value="isChecked,asc">By Incomplete Tasks</option>
                    <option value="isChecked,desc">By Completed Tasks</option>
                  </select>
                </div>

                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                  <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Todos
                  </h1>
                  <table className="min-w-full bg-white border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="text-md md:text-lg p-3 font-semibold text-gray-600 text-center tracking-wider">
                          Work Done
                        </th>
                        <th className="text-md md:text-lg p-3 font-semibold text-gray-600 text-center tracking-wider">
                          Title
                        </th>
                        <th className="text-md md:text-lg p-3 font-semibold text-gray-600 text-center tracking-wider">
                          Description
                        </th>
                        <th className="text-md md:text-lg p-3 font-semibold text-gray-600 text-center tracking-wider">
                          Due Date
                        </th>
                        <th className="text-md md:text-lg p-3 font-semibold text-gray-600 text-center tracking-wider">
                          Update
                        </th>
                        <th className="text-md md:text-lg p-3 font-semibold text-gray-600 text-center tracking-wider">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((curTask, index) => (
                        <tr
                          key={curTask.id || index}
                          className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
                        >
                          <td className="text-md md:text-lg p-3 font-medium text-center text-gray-700">
                            <input
                              type="checkbox"
                              checked={curTask.isChecked}
                              onClick={() => handleToggleCheck(curTask._id)}
                              readOnly
                            />
                          </td>
                          <td className="text-md md:text-lg p-3 font-medium text-center text-gray-700">
                            {curTask.title}
                          </td>
                          <td className="text-md md:text-lg p-3 font-medium text-center text-gray-700">
                            {curTask.description}
                          </td>
                          <td className="text-md md:text-lg p-3 font-medium text-center text-gray-700">
                            {new Date(curTask.dueDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td className="text-sm sm:text-base p-2 sm:p-4 font-medium text-center">
                            <Link
                              to={`/user/task/${curTask._id}/edit`}
                              className="inline-block px-6 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md shadow-lg transition duration-300 transform hover:scale-105 hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                              Update
                            </Link>
                          </td>

                          <td className="text-xl md:text-lg p-3 font-medium text-center">
                            <button
                              className="inline-block px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-lg transition duration-300 transform hover:scale-105 hover:bg-red-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              onClick={() => deleteTask(curTask._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
            <Footer />
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Todos;
