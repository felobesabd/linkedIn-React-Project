import { SET_USER } from "./actionTypes.js";

const userAction = (payload)=> {
    return {
        type: SET_USER,
        user: payload,
    }
}