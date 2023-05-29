import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        message: {
            text: { type: String, required: true },
        },
        from: Number,
        to: Number
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Messages", MessageSchema)