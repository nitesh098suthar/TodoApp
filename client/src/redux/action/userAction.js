import axios from "axios";
import { SERVER_URI } from "../store";

export const authInstance = axios.create({
  withCredentials: true,
  Headers: {
    "Content-Type": "application/json",
  },
  baseURL: SERVER_URI + "/api/v1",
});

//ye wale jo arg hai unka nam req.body se match hona chaiye - authController wale me se
export const signup = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "signupReq" });
    const { data } = await authInstance.post("/user/register", {
      name,
      email,
      password,
    });
    dispatch({ type: "signupRes", payload: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: "signupRej", payload: "error occurred" });
  }
};

//here we're creating --==--==--==--==--==--==--==--==--

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginReq" });
    const { data } = await authInstance.post("/user/login", {
      email,
      password,
    });
    dispatch({ type: "loginRes", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "loginRej", payload: "error occurred" });
  }
};

//here we're creating ==---==---==---==

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgetPasswordReq",
    });

    const { data } = await authInstance.post(
      "/user/password/forget",
      { email },
      {
        withCredentials: false,
      }
    );

    dispatch({ type: "forgetPasswordRes", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "forgetPasswordRej",
      payload: "error occurred",
    });
  }
};

// =======change password

export const changePassword =
  (currentPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "changePasswordReq" });

      const { data } = await authInstance.put("/user/password/change", {
        currentPassword,
        newPassword,
      });

      dispatch({ type: "changePasswordRes", payload: data });
    } catch (error) {
      console.log(error);

      dispatch({ type: "changePasswordRej", payload: "error occurred" });
    }
  };

// deleteProfile

export const deleteProfile = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "deleteReq" });

    const { data } = await authInstance.delete(
      "/user/me",
      { email, password },
      {
        withCredentials: false,
      }
    );
    dispatch({ type: "deleteRes", payload: data });
  } catch (error) {
    dispatch({ type: "deleteRej", payload: "error" });
  }
};

///////logout

export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: "logOutReq" });

    const { data } = await authInstance.get("/user/logout");

    dispatch({ type: "logOutRes", payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: "logOutRej", payload: "error occured" });
  }
};

////// getUser

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: "getUserReq" });

    const { data } = await authInstance.get("/user/me");

    dispatch({ type: "getUserRes", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "getUserRej", payload: "error occurred" });
  }
};

//editUser

export const editUser = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: "editUserReq" });

    const { data } = await authInstance.put("/user/me", {
      name,
      email,
    });

    dispatch({ type: "editUserRes", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "editUserRej", payload: "error occurred" });
  }
};

//resetPassword

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordReq" });

    const { data } = await authInstance.put(
      `/user/password/reset/${token}`,
      {
        password,
      },
      {
        withCredentials: false,
      }
    );

    dispatch({ type: "resetPasswordRes", payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: "resetPasswordRej", payload: "error occurred" });
  }
};
