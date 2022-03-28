import {useStore } from "react-redux";
import { createStore } from "redux";
import SendItReducer from "./Reducers/SendItReducer";

const store = createStore(SendItReducer);
export default store;