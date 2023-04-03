import {SET_ARTICLES, SET_LOADING_STATUS, SET_USER} from "./actionTypes.js";

export const setUser = (payload)=> {
    return {
        type: SET_USER,
        user: payload,
    }
}

export const setLoading = (status)=> {
    return {
        type: SET_LOADING_STATUS,
        status: status,
    }
}

export const setArticles = (payload)=> {
    return {
        type: SET_ARTICLES,
        payload: payload,
    }
}