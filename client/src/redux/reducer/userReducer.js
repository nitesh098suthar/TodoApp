import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

const userReducer = createReducer(initialState, {


  loginReq: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loginRes: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.isAuthenticated = true;
  },
  loginRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },




  signupReq: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  signupRes: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.isAuthenticated = true;
  },
  signupRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },


  
  changePasswordReq: (state) => {
    state.loading = true;
  },
  changePasswordRes: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  changePasswordRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },



  forgetPasswordReq: (state) => {
    state.loading = true;
  },
  forgetPasswordRes: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  forgetPasswordRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },



  resetPasswordReq: (state) => {
    state.loading = true;
  },
  resetPasswordRes: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  resetPasswordRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },



  getUserReq: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  getUserRes: (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.isAuthenticated = true;

  },
  getUserRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;

  },




  
  editUserReq: (state) => {
    state.loading = true;
  },
  editUserRes: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  editUserRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },


  
  logOutReq: (state) => {
    state.loading = true;
  },
  logOutRes: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.message = action.payload.message;
  },
  logOutRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },



  deleteReq: (state) => {
    state.loading = true;
  },
  deleteRes: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  deleteRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },


  
});


export default userReducer;