import { authInstance } from "./userAction";

export const createTask = (title, description) => async (dispatch) => {
  try {
    dispatch({ type: "addingReq" });

    const { data } = await authInstance.post("/task/add", {
      title,
      description,
    });

    dispatch({ type: "addingRes", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "addingRej", payload:error.response.data.error });
  }
};

export const getTask = () => async (dispatch) => {
  try {
    dispatch({ type: "gettingReq" });

    const { data } = await authInstance.get("/task/get");

    dispatch({ type: "gettingRes", payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: "gettingRej", payload:error.response.data.error });
  }
};

//delete action

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deletingReq" });

    const { data } = await authInstance.delete("/task/delete/" + id);

    dispatch({ type: "deletingRes", payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: "deletingRej", payload: error.response.data.error });
  }
};

//update task

export const updateTask = (id, title, description) => async (dispatch) => {
  try {
    dispatch({ type: "updateReq" });

    const { data } = await authInstance.put(`/task/update/${id}`, {
      title,
      description,
    });

    dispatch({ type: "updateRes", payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: "updateRej", payload: error.response.data.error });
  }
};

//getting single task
export const getSingleTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getSingleTaskReq" });
    const { data } = await authInstance.get("/task/get/" + id);
    dispatch({ type: "getSingleTaskRes", payload: data });
  } catch (error) {
    dispatch({ type: "getSingleTaskRej", payload: error.response.data.error });
  }
};
