// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import homeReducer from "./slices/homeSlice"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // add the reducers you want to persist
}

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
