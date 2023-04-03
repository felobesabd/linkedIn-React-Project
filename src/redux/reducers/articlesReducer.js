import { SET_ARTICLES, SET_LOADING_STATUS } from '../actions/actionTypes'

const initialState = {
    loading: false,
    articles: []
};

const articlesReducer = (state= initialState, action)=> {
    switch (action.type) {
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status
            }

        case SET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            }
        default:
            return state;
    }
}

export default articlesReducer;