import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    isChecked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Todo = new model("Todo", todoSchema);

export default Todo;