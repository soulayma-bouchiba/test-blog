import { GET_CATS_LOAD, GET_CATS_SUCCESS, GET_CATS_FAIL, ADD_CATEGORY, ADD_CAT_LOAD, ADD_CAT_FAIL } from "../constant/categories";

    import axios from 'axios';


    //Get all cats
    export const getCategories = () => async(dispatch) => {
        dispatch({type: GET_CATS_LOAD})
        try {
             const result = await axios.get('/api/categories')
            dispatch({
                type: GET_CATS_SUCCESS,
                payload: result.data
            })
        } catch (error) {
            console.dir(error)
            dispatch({
                type: GET_CATS_FAIL,
                payload: error.response.data
            })
        }
    }
    
    
    
    //create cat
    export const addCategory = (FormData) => async(dispatch) => {
        dispatch({type: ADD_CAT_LOAD})
        try {
          
            const res = await axios.post(`/api/categories`, FormData)
            dispatch({
                type: ADD_CATEGORY,
                payload: res.data
            })
        } catch (error) {
            console.dir(error)
            const {errors, msg} = error.response.data
            if(Array.isArray(errors)){
                errors.forEach(err => alert(err.msg))
            }
            if(msg){
                return alert(msg)
            }
            dispatch({type: ADD_CAT_FAIL})
        }
    }
    

    