import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link,Navigate } from "react-router-dom";
import Navbar from "../components/NavBar";

const Todos = () => {
  const [dateTime, setDateTime] = useState("");
  const [services, setServices] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const { userAuthToken,token,storeTokenInLs,isLoggedIn} = useAuth();

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
        storeTokenInLs(token)
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
  const fetchSortedTasks = async (sortOrder) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/todo/getSortedTodos?sortOrder=${sortOrder}`,
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
    <Navbar/>
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
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-wrap justify-center mt-10 gap-4 px-6"
            >
              <input
                type="text"
                className="w-full sm:w-2/3 md:w-1/2 bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 p-3 transition-colors duration-200 ease-in-out"
                autoComplete="off"
                name="title"
                value={task.title}
                onChange={handleInputChange}
                placeholder="Title"
              />
              <input
                type="text"
                className="w-full sm:w-2/3 md:w-1/2 bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 p-3 transition-colors duration-200 ease-in-out"
                autoComplete="off"
                name="description"
                value={task.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
              <input
                type="date"
                className="w-full sm:w-2/3 md:w-1/2 bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 p-3 transition-colors duration-200 ease-in-out"
                autoComplete="off"
                name="dueDate"
                value={task.dueDate}
                onChange={handleInputChange}
                placeholder="dueDate"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-indigo-500 border-0 py-3 px-6 rounded font-bold text-lg text-center focus:outline-none hover:bg-indigo-600 transition duration-200"
              >
                Add Task
              </button>
            </form>
          </section>
          <section className="mx-auto max-w-screen-xl p-4">
            <div className="flex items-center justify-center ">
              <button
                className="hover:underline mx-8 w-fit text-red-600 transition-colors duration-200 border-2 border-red-500 rounded-lg p-4"
                onClick={() => fetchSortedTasks("asc")}
              >
                sort by asc due Date
              </button>
              <button
                className="hover:underline w-fit text-red-600 transition-colors duration-200 border-2 border-red-500 rounded-lg p-4"
                onClick={() => fetchSortedTasks("desc")}
              >
                Sort by desc due Date
              </button>
            </div>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Todos
              </h1>
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-md md:text-lg p-4 font-semibold text-gray-600 text-center tracking-wider">
                      Work Done
                    </th>
                    <th className="text-md md:text-lg p-4 font-semibold text-gray-600 text-center tracking-wider">
                      Title
                    </th>
                    <th className="text-md md:text-lg p-4 font-semibold text-gray-600 text-center tracking-wider">
                      Description
                    </th>
                    <th className="text-md md:text-lg p-4 font-semibold text-gray-600 text-center tracking-wider">
                      Due Date
                    </th>
                    <th className="text-md md:text-lg p-4 font-semibold text-gray-600 text-center tracking-wider">
                      Update
                    </th>
                    <th className="text-md md:text-lg p-4 font-semibold text-gray-600 text-center tracking-wider">
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
                      <td className="text-md md:text-lg p-4 font-medium text-center text-gray-700">
                        <input
                          type="checkbox"
                          checked={curTask.isChecked}
                          onClick={() => handleToggleCheck(curTask._id)}
                          readOnly
                        />
                      </td>
                      <td className="text-md md:text-lg p-4 font-medium text-center text-gray-700">
                        {curTask.title}
                      </td>
                      <td className="text-md md:text-lg p-4 font-medium text-center text-gray-700">
                        {curTask.description}
                      </td>
                      <td className="text-md md:text-lg p-4 font-medium text-center text-gray-700">
                        {curTask.dueDate}
                      </td>
                      <td className="text-xl md:text-lg p-4 font-medium text-center text-red-500">
                        <Link to={`/admin/users/${curTask._id}/edit`}>
                          Update
                        </Link>
                      </td>
                      <td className="text-xl md:text-lg p-4 font-medium text-center text-red-500">
                        <button
                          className="hover:underline text-red-600 transition-colors duration-200"
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
        ):(
          <Navigate to="/login"/>
        )}
    </>
  );
};

export default Todos;
