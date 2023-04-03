import {combineReducers} from "redux";
import userReducer from "./userReducer.js";
import articlesReducer from "./articlesReducer.js";


const rootReducers = combineReducers({
    userState: userReducer,
    articlesState: articlesReducer,
})

export default rootReducers;