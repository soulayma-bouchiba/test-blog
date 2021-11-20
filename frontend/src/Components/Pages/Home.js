import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../JS/Actions/postActions";
//import { useLocation } from "react-router";
//import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header"
import Posts from "../posts/Posts"
import './home.css'

export default function Home() {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.postReducer.posts);
  
  useEffect(() => {
    dispatch(getPosts());
    //eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <Header />
     
      <div className="home">
        <Posts posts={posts} />
        
      </div>
    </>
  );
}