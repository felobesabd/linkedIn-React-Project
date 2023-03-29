import {combineReducers} from "redux";
import userReducer from "./userReducer.js";


const rootReducers = combineReducers({
    userState: userReducer,
})

export default rootReducers;