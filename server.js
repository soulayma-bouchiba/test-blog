const express = require("express");
const connectDB = require('./config/connectDB')
const authRouter = require("./routes/Auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories");

const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const app = express()

dotenv.config()

connectDB()
//middleware
app.use(express.json())

//make folder images public 
//app.use(express.static(path.join(__dirname, "frontend", "public")));

app.use("/images", express.static(path.join(__dirname, "/images")));

//create a storage to store images in a folder uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./frontend/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name);
  }
});

const upload = multer({ storage: storage });

//when post new post with image
app.post("/uploads", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//use routes
app.use("/api/auth", authRouter)
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

//deploy
if(process.env.NODE_ENV === "production") {
  //set static folder
  //All the js and css files will be read and served from this folder
  app.use(express.static("frontend/build"))

  //index.html for all page routes
  app.get('*', (req, res) =>{
      res.sendFile(path.resolve(__dirname, "build", "index.html"))
  })
}

const PORT = process.env.PORT || 6000 ;

app.listen(PORT,(err)=>{
    err? console.log(err)
    :console.log(`server is running on port ${PORT}`)
})
