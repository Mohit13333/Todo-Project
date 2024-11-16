import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Footer from "../components/footer";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Todos = () => {
  const [dateTime, setDateTime] = useState("");
  const { services } = useAuth();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  // const { storeTokenInLs } = useAuth();
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTask({
      ...task,
      [name]: value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // storeTokenInLs(data.token);
        setTask({
          title: "",
          description: "",
          dueDate: "",
        });
        toast.success(data.message);
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // todo date and time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatDate = now.toDateString();
      const formatTime = now.toLocaleTimeString();
      setDateTime(`${formatDate}-${formatTime}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo/deleteTodos/${id}`,
        {
          method: "DELETE",
          headers: {
            // Authorization: userAuthToken,
          },
        }
      );
      console.log(response);
      const data = await response.json();
      toast.success(data.message);
      if (response.ok) {
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleToggleCheck = async (id) => {
    try {
      const response = await fetch(
        `
        ${import.meta.env.VITE_BACKEND_URI}/api/todo/toggleCheck/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update local state to reflect the change
        setServices((prevServices) =>
          prevServices.map((task) =>
            task.id === id ? { ...task, isChecked: !task.isChecked } : task
          )
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error toggling check status:", error);
      toast.error("Failed to update task.");
    }
  };


  const fetchSortedTasks = async (sortOrder) => {
    try {
      const response = await fetch(`
        ${import.meta.env.VITE_BACKEND_URI}/api/todo/getSortedTodos?sortOrder=${sortOrder}`
      );
      const data = await response.json();
      if (response.ok) {
        setTodos(data.todos); // Update state with sorted tasks
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching sorted tasks:", error);
      toast.error("Failed to fetch tasks.");
    }
  };

  


  const sortTasksByDate = (tasks, sortOrder = "asc") => {
    return tasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  };

  const handleSort = (order) => {
    const sortedTasks = sortTasksByDate([...task], order); // Clone the tasks before sorting
    setTodos(sortedTasks); // Update the state with the sorted list
  };
  return (
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
            <button className="hover:underline mx-8 w-fit text-red-600 transition-colors duration-200 border-2 border-red-500 rounded-lg p-4" onClick={() => handleSort("asc")}>Sort by Earliest</button>
            <button className="hover:underline w-fit text-red-600 transition-colors duration-200 border-2 border-red-500 rounded-lg p-4" onClick={() => handleSort("desc")}>Sort by Latest</button>
            </div>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Todos
              </h1>
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-md md:text-lg p-4 font-semibold text-gray-600 text-center tracking-wider">
                      Checked
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
                  {services.map((curTask) => (
                    <tr
                      key={curTask.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
                    >
                      <td className="text-md md:text-lg p-4 font-medium text-center text-gray-700">
                        <input
                          type="checkbox"
                          checked={curTask.isChecked}
                          onChange={() => handleToggleCheck(task.id)}
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
  );
};

export default Todos;
