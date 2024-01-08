import mongoose, { Schema, InferSchemaType } from "mongoose";

const schema = new Schema(
    {
		userId: {type: Schema.Types.ObjectId, ref: 'User'},
        title: { type: String, required: true },
        task: { type: String, required: false},
        completed: { type: Boolean, required: true, default: false },
        lastNotify: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export type Todo = InferSchemaType<typeof schema>;

export const TodoModel = mongoose.model("Todo", schema);
