import { GET_CATS_LOAD, GET_CATS_SUCCESS, GET_CATS_FAIL, ADD_CATEGORY, ADD_CAT_LOAD, ADD_CAT_FAIL } from "../constant/categories";


const initialState = {
    cats: [],
    loading: false,
    cat: {},
    error: null,
}

const categoriesReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case ADD_CAT_LOAD :
            case GET_CATS_LOAD:
            return {
                ...state, 
                loading: true
            }
            case ADD_CATEGORY:
            return {
                ...state,
                loading: false,
                cat: payload
            }
        case ADD_CAT_FAIL :
            case GET_CATS_FAIL :
            return {
                ...state,
                loading: false,
                error: payload
            }
            case GET_CATS_SUCCESS :
                return {
                    ...state,
                    loading: false,
                    cats: payload
                }
           
    
        default:
            return state
    }
}

export default categoriesReducer;