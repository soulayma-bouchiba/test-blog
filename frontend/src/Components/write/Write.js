
import { useState } from "react";
import "./write.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../JS/Actions/postActions";
//import { Link } from 'react-router-dom'
export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const user = useSelector(state => state.authReducer.user)
const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      name: user.name,
      title,
      desc,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/uploads", data);
      } catch (err) {}
    }
    
    dispatch(addPost(newPost))
   
   };
   if(!user === true){
    return (<div>
      <h1 style={{color:"red"}}><center> Create an account to create a post</center> </h1>
      </div>
      )
}
  return (
    <div className="write">
  
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit} >
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
       
                  <button className="writeSubmit" type="submit">
          Publish
        </button>
      
      </form>
    </div>
  )
}
