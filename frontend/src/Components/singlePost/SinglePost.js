import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  deletePost, updatePost } from "../../JS/Actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './singlePost.css'


export default function SinglePost({match}) {
  const post = useSelector(state => state.postReducer.post);

  const id = match.params.id;
  const dispatch = useDispatch();
  const history =useHistory();

  const  user  = useSelector(state => state.authReducer.user)
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  
  //if edit
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
  if(toggle){
    setTitle(post.title)
   setDesc(post.desc)
   setName(post.name)
  }
   
  }, [post, toggle]);

  const handleDelete = async () => {
    dispatch(deletePost(id))
    history.push("/")
  };

  
  const handleUpdate = async () => {
    dispatch(updatePost(post._id, {title, desc,name}))
      setToggle(false)
      history.push("/")
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={`/uploads/${post.photo}`} alt="" className="singlePostImg" />
        )} 
       <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        
          <h1 className="singlePostTitle">
            {title}
             {post.name === user?.name && ( 
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setToggle(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )} 
          </h1>
      
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.name}`} className="link">
              <b> {post.name}</b>
            </Link>
          </span>
          <span className="singlePostDate">

            {new Date(post.createdAt).toDateString()}
          </span>
          <p className="singlePostDesc">{post.desc}</p>
        </div>
        {toggle ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {toggle && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}