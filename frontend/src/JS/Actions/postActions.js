import { GET_POSTS_LOAD, GET_POSTS_SUCCESS, GET_POSTS_FAIL, ADD_POST_LOAD, ADD_POST_SUCCESS,
     ADD_POST_FAIL, GET_POST_LOAD,GET_POST_SUCCESS, GET_POST_FAIL } from "../constant/post";

    import axios from 'axios';


    //Get all posts
    export const getPosts = () => async(dispatch) => {
        dispatch({type: GET_POSTS_LOAD})
        try {
             const result = await axios.get('/api/posts')
            dispatch({
                type: GET_POSTS_SUCCESS,
                payload: result.data
            })
        } catch (error) {
            console.dir(error)
            dispatch({
                type: GET_POSTS_FAIL,
                payload: error.response.data.msg
            })
        }
    }
    
    //Get post by id
    export const getPost = (id) => async(dispatch) => {
        dispatch({type: GET_POST_LOAD})
        try {
            let result = await axios.get(`/api/posts/${id}`)
            dispatch({
                type: GET_POST_SUCCESS,
                payload: result.data
            })
        } catch (error) {
            console.log(error)
            dispatch({type: GET_POST_FAIL,
            payload: error.response.data.msg})
        }
    }
    
    export const deletePost = (id) => async(dispatch) => {
         //headers
         const config = {
            headers:{
                'x-auth-token': localStorage.getItem('token')
            }
        }

        axios
        .delete(`/api/posts/${id}`, config)
        .then((() => dispatch(getPosts())))
        .catch(err => console.log(err))
    }
    
    //Update post
    export const updatePost = (id, post) => async(dispatch) => {
        try {
            //headers
            const config = {
                headers:{
                    'x-auth-token': localStorage.getItem('token')
                }
            }
            await axios.put(`/api/posts/${id}`, post, config)
            dispatch(getPosts())
        } catch (error) {
            console.log(error)
            dispatch({type: GET_POST_FAIL})
        }
    }
    
    //create post
    export const addPost = (FormData) => async(dispatch) => {
        dispatch({type: ADD_POST_LOAD})
        try {
            const res = await axios.post(`/api/posts`, FormData)
            

            dispatch({
                type: ADD_POST_SUCCESS,
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
            dispatch({type: ADD_POST_FAIL})
        }
    }