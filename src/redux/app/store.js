import {applyMiddleware, createStore} from "redux";
import Thunk from 'redux-thunk'

import rootReducers from "../reducers/rootReducers.js";

export const store = createStore(rootReducers, applyMiddleware(Thunk))