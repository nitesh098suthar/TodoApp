import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./reducer/userReducer"
export const SERVER_URI = 'http://localhost:8000'

export const store = configureStore({
    reducer:{
        auth:userReducer,
    }
})