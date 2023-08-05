import { authInstance } from "./userAction";

export const createTask = (title, description) => async(dispatch) =>
{
    try {
        
        dispatch({type:"addingReq"})

        const {data} = await authInstance.post("/task/add", {
            title, description
        })

        dispatch({type: "addingRes", payload : data})


    } catch (error) {
        console.log(error)
        dispatch({type: "addingRej", payload: "error aaya"})
        
    }
}


export const getTask = (title, description) => async(dispatch) =>
{
    try {

        dispatch({type: "gettingReq"})

        const {data} = await authInstance.get("/task/get")

        dispatch({type: "gettingRes", payload : data})

    } catch (error) {

        console.log(error);

        dispatch({type: "gettingRej", payload : "error aaya"})
        
    }
}


//delete action

export const deleteTask = (id) => async(dispatch) =>
{
    try {
        
            dispatch({type: "deletingReq"})

            const {data} = await authInstance.delete("/task/delete/"+id)

            dispatch({type: "deletingRes", payload: data})


    } catch (error) {

        console.log(error);

        dispatch({type: "deletingRej", payload: "error aaya"})
        
    }
}

//update task

export const updateTask = (id, title, description) => async (dispatch) => {

    try {

        dispatch({type: "updateReq"})

        const {data} = await authInstance.put(`/task/update/${id}`, {
            title, description
        })

        dispatch({type: "updateRes", payload : data})
        
    } catch (error) {

        console.log(error)

        dispatch({type: "updateRej", payload : "error aaya"})
        
    }
}