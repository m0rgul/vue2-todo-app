import { Schema, model, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  done: boolean;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Todo = model<ITodo>("Todo", TodoSchema);
