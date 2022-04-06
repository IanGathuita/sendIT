
import { createStore } from "redux";
import SendItReducer from "./Reducers/SendItReducer";
import { applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(SendItReducer,composeWithDevTools(applyMiddleware(thunk)));
export default store;