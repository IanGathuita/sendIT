import {useStore } from "react-redux";
import { createStore } from "redux";
import LoginReducer from "./Reducers/LoginReducer";

const store = createStore(LoginReducer);
export default store;