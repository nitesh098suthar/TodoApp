import { UserModel } from "../Model/Auth.js";
import { TaskModel } from "../Model/Task.js";

export const addController = async (req, res) => {

    const { title, description } = req.body;

    const user = await UserModel.findById(req.id);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User"
        })
    }

    await TaskModel.create({ title, description, userID: user._id })


    return res.status(201).json({
        success: true,
        message: "task created",
    })


}
export const updateController = async (req, res) => {

    const userID = req.id;

    const { title, description } = req.body;


    const userAvailable = await UserModel.findById(userID);

    if (!userAvailable) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User"
        })
    }

    await TaskModel.findByIdAndUpdate(userAvailable._id, { title, description })

    return res.status(200).json({
        success: true,
        message: "task updated",
    })

}
export const deleteController = async (req, res) => {

    const userID = req.id;

    const user = await UserModel.findById(userID)

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "unauthorized user"
        })
    }

    const taskID = req.params.id
    const currTask = await TaskModel.findById(taskID)

    if (!currTask) {
        return res.status(404).json({
            success: false,
            message: "task not found"
        })
    }

    await currTask.deleteOne();

    return res.status(200).json({
        success: true,
        message: "task deleted",
    })


}
export const getController = async (req, res) => {



    const userID = req.id;
    const currentUser = await UserModel.findById(userID);

    if (!currentUser) {
        return res.status(401).json({
                success: false,
                message: "unauthorized user"
            })
    }

    const tasks = await TaskModel.find({userID})
    return res.status(200).json({
        success: true,
        tasks
    })
    
}