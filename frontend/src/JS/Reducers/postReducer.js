import { GET_POSTS_LOAD, GET_POSTS_SUCCESS, GET_POSTS_FAIL, ADD_POST_LOAD, ADD_POST_SUCCESS, ADD_POST_FAIL, GET_POST_LOAD, 
    GET_POST_SUCCESS, GET_POST_FAIL, GET_POST_RESET } from "../constant/post";

const initialState = {
    posts: [],
    loading: false,
    post: {},
    error: null,
}

const productReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case GET_POST_LOAD :
            case GET_POSTS_LOAD:
                case ADD_POST_LOAD:
            return {
                ...state, 
                loading: true
            }
        case GET_POST_SUCCESS :
            case ADD_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                post: payload
            }
        case GET_POST_FAIL :
            case GET_POSTS_FAIL :
                case ADD_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
            case GET_POSTS_SUCCESS :
                return {
                    ...state,
                    loading: false,
                    posts: payload
                }
            case GET_POST_RESET:
                return {
                    ...state,
                    loading: false,
                    post: {}
                }
    
        default:
            return state
    }
}

export default productReducer;