import axios from "axios"

import {LOGIN_USER,USER_LOADING,LOGOUT_USER,REGISTER_USER,GET_AUTH_USER,AUTH_ERRORS,GET_USER_LOAD, 
        GET_USER_SUCCESS,GET_USER_FAIL,EDIT_USER_LOAD,EDIT_USER_SUCCESS,EDIT_USER_FAIL, 
        GET_USER }  from "../constant/Actions-types"


//loading user
export const userLoading = ()=>(dispatch)=>{
    dispatch({
        type:USER_LOADING
    })
}
//register user
export const registerUser = (formData) =>async(dispatch)=>{
    dispatch(userLoading())
    try {
        const res = await axios.post('/api/auth/register',formData)
        dispatch({
            type:REGISTER_USER,
            payload:res.data//{msg,user,token}
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
        dispatch({type: AUTH_ERRORS})
    }
}
//login
export const loginUser = (formData) =>async(dispatch)=>{
    dispatch(userLoading())
    try {
        const res = await axios.post('/api/auth/login',formData)
        dispatch({
            type:LOGIN_USER,
            payload:res.data//{msg,user,token}
        })
    } catch (error) {
        console.dir(error)  
        const {errors,msg}= error.response.data
        if(Array.isArray(errors)){
            errors.forEach((err)=>alert(err.msg))
        }
        if(msg){
            return alert(msg)
        }
        dispatch({type:AUTH_ERRORS})
    }
}

//get auth user
export const getAuthUser = ()=>async(dispatch)=>{
    dispatch(userLoading())
   try {
       //headers
       const config ={
           headers : {
               'x-auth-token':localStorage.getItem('token')
           }
       }
    const res = await axios.get('/api/auth/user',config)
    dispatch({
        type:GET_AUTH_USER,
        payload:res.data // {user:req.user}
    })
   } catch (error) {
    console.log(error)
    dispatch({type:AUTH_ERRORS})
   }
}

//Logout
export const logoutUser = () => (dispatch) => {
    dispatch({
        type:LOGOUT_USER
    })
}

//Get all users
export const getUsers = () => async(dispatch) => {
    dispatch({type: GET_USER_LOAD})
    try {
         //headers
         const config = {
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        }
        let result = await axios.get("/api/users", config)
        dispatch({
            type: GET_USER_SUCCESS, 
            payload: result.data.response
        })
    } catch (error) {
        dispatch({type: GET_USER_FAIL})
        console.dir(error)
    }
}
// delete user
export const deleteUser = (id) => async(dispatch) => {
      //headers
      const config = {
        headers:{
            'auth-token': localStorage.getItem('token')
        }
    }
    axios
    .delete(`/api/users/${id}`, config)
    .then((() => dispatch(getUsers())))
    .catch(err => console.log(err))
}
//get user by id
export const getUser = (id) => async(dispatch) => {
    dispatch({type: GET_USER_LOAD})
    try {
          //headers
          const config = {
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        }
        let result = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: GET_USER,
            payload: result.data.response
        })
    } catch (error) {
        console.dir(error)
        dispatch({type: GET_USER_FAIL})
    }
}
// edit user
export const updateUser = (id, user) => async(dispatch) => {
    dispatch({type: EDIT_USER_LOAD})
    try {
          //headers
          const config = {
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        }
        let result = await axios.put(`/api/users/${id}`, user, config)
        
        dispatch({
            type: EDIT_USER_SUCCESS,
            payload: result.data
        })
      
    } catch (error) {
        console.dir(error)
        dispatch({type: EDIT_USER_FAIL})
    }    
}