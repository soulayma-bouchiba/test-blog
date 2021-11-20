import { Link } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { logoutUser } from '../../JS/Actions/userActions';

import "./AppNavBar.css";

export default function AppNavBar() {

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.authReducer.isAuth)
  const user = useSelector(state => state.authReducer.user)
  
  const handleLogout = () => {
    dispatch(logoutUser())
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {isAuth && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {isAuth ? (
           <>
           
           <div>
           <span style={{marginRight:"2rem"}}>
           <strong>
           <span style={{marginRight:"1rem"}}>
           Welcome
           </span>
            {  user.name}
           </strong>
           </span>
           </div>
          </>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}