import {Switch,Route} from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuthUser } from "./JS/Actions/userActions";

import './App.css';
//import Single from "./Components/single/Single";
import Write from "./Components/write/Write";
//import Settings from "./Components/settings/Settings";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AppNavBar from './Components/Route/AppNavBar';
import Home from "./Components/Pages/Home";
import Dashboard from "./Components/Pages/Dashboard";
import PrivateRoute from "./Components/Routes/PrivateRoute"
import SinglePost from "./Components/singlePost/SinglePost";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
  
function App() {
  const dispatch = useDispatch()
  const getUser = () => dispatch(getAuthUser())
  useEffect(()=>{
    getUser()
    // eslint-disable-next-line
  },[])
  return (
    <div >
     
    <AppNavBar />
    <Switch>
      <Route exact path='/' component={Home} />
      <PrivateRoute path="/dashboard" component={Dashboard} /> 
      <Route path="/register" component={Register} /> 
      <Route path="/login" component={Login} />
      <Route path="/write" component={Write} />
      
      <div style={{margin: 'auto',display: 'block',width: 'fit-content' }}>
      <Route path="/post/:id" component={SinglePost}/>
      
      <FormControlLabel 
        control={<Checkbox icon={<FavoriteBorder />} 
                  checkedIcon={<Favorite />}
                  name="checkedH" />}
                  label=""/>
                  
    </div>
    </Switch>
    </div>
  

  );
}
export default App;