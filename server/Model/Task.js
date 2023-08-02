import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please Provide Title']
        },

        description: {
            type: String,
            required: [true, 'Please Provide Title'],
            maxLength: [150, "Description can't exceed 150 letters"]
        },

        userID: {
            type: mongoose.Schema.ObjectId,
            rel: "User"
        },


        createdAt: {
            type: Date,
            default: Date.now
        },

    }
)

export const TaskModel = mongoose.model("Task", userSchema);