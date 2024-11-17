import Todo from "../models/tododata.model.js";
const todos = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user._id;

    const newTodo = new Todo({
      title,
      description,
      dueDate,
      owner: userId,
    });

    await newTodo.save();
    return res.status(200).json({ message: "Task added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Please select future due date", error });
  }
};

const getTodos = async (req, res) => {
  try {
    const userId = req.user._id;

    const todosData = await Todo.find({ owner: userId });

    if (!todosData || todosData.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }

    return res.status(200).json({ todosData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    if (!id) {
      return res.status(400).json({ message: "Todo id is required" });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this todo" });
    }

    await Todo.deleteOne({ _id: id });
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred while deleting task", error });
  }
};

const updateTodos = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const data = req.body;
    const todo = await Todo.findById(id);
    if (data.dueDate && new Date(data.dueDate) <= new Date()) {
      return res.status(400).json({ message: "Please Select future date" });
    }
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this todo" });
    }

    await Todo.updateOne({ _id: id }, { $set: data });
    return res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const toggleTodoCheck = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to toggle this todo" });
    }

    todo.isChecked = !todo.isChecked;
    const updatedTodo = await todo.save();

    return res.status(200).json({
      message: `Task ${todo.isChecked ? "completed" : "incomplete"}`,
      todo: updatedTodo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while updating task", error });
  }
};

const getSortedTodos = async (req, res) => {
  const { dueTask,checkedTask } = req.query;
  const userId = req.user._id;
  try {
    const todos = await Todo.find({ owner: userId }).sort({
      isChecked: checkedTask === "desc" ? -1 : 1,
      dueDate: dueTask === "desc" ? -1 : 1,
    });
    res.status(200).json({ message: "Tasks retrieved successfully", todos });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve tasks", error: error.message });
  }
};

export {
  todos,
  getTodos,
  deleteTodo,
  updateTodos,
  toggleTodoCheck,
  getSortedTodos,
};
