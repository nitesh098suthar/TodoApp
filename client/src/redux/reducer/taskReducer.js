import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const taskReducer = createReducer(initialState, {
  //add task events

  addingReq: (state) => {
    state.loading = true;
  },
  addingRes: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  addingRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //get task events

  gettingReq: (state) => {
    state.loading = true;
  },
  gettingRes: (state, action) => {
    state.loading = false;
    state.tasks = action.payload.tasks;
  },
  gettingRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.tasks = null;
  },

  //delete task events

  deletingReq: (state) => {
    state.loading = true;
  },
  deletingRes: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  deletingRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  editingReq: (state) => {
    state.loading = true;
  },
  editingRes: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  editingRej: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //getting single task
  getSingleTaskReq: (state) => {
    state.loading = true;
  },
  getSingleTaskRes: (state, action) => {
    state.loading = false;
    state.task = action.payload.task;
  },
  getSingleTaskRej: (state, action) => {
    state.loading = false;
    state.task = null;
    state.error = action.payload;
  },

  clearMessage: (state) => {
    state.message = null;
  },
  clearError: (state) => {
    state.error = null;
  },
});
