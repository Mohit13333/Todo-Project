import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => {
          return value > Date.now();
        },
        message: "Due date must be in the future",
      },
    },
    isChecked: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = new model("Todo", todoSchema);

export default Todo;
