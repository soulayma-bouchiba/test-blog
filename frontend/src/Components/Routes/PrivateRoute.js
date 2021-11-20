import React from 'react'
//import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component : Component , ...rest}) => {

const isAuth = useSelector((state) => state.authReducer.isAuth)

 if(isAuth===true){
    return <Route component={Component} {...rest}  />
 }
 return <Redirect to="Login" />
}
export default PrivateRoute