import { GET_USER_LOAD, GET_USER_SUCCESS, GET_USER_FAIL, GET_USER, GET_USER_RESET, EDIT_USER_SUCCESS, EDIT_USER_FAIL, EDIT_USER_LOAD } from "../constant/Actions-types";

const initialState = {
    users: [],
    userLoding: true,
    errors: {},
    user: {},
}

const userReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case GET_USER_LOAD:
            case EDIT_USER_LOAD:
            return {
               ...state,
               userLoding: true 
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                userLoding: false,
                users: payload
            }
        case GET_USER_FAIL:
            case EDIT_USER_FAIL:
            return {
                ...state,
                userLoding: false,
                errors: payload
            }
        case GET_USER:
            case EDIT_USER_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case GET_USER_RESET:
            return {
                user: {}
            }
        default:
            return state
    }
}

export default userReducer;