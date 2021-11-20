import "./post.css";
import { useDispatch } from "react-redux";
import { getPost } from "../../JS/Actions/postActions";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const dispatch = useDispatch()  
  return (
    <div className="post">
      {post.photo &&  
      <img className="postImg" src={`/uploads/${post.photo}`} alt={post.title} />
      }
      <div className="postInfo">
      
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle" onClick={() => dispatch(getPost(post._id))}>
            {post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}