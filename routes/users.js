const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate({_id:req.params.id}, {$set: {...req.body}});
      if(updatedUser){
        res.status(200).send({updatedUser, msg: "user update"});
      }
      return res.status(400).send({msg: "User does not exist!!"})

    } catch (err) {
      return res.status(500).send({msg: "Can not update this user!!"})    
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        //delete all his posts
        await Post.deleteMany({ name: user.name });
        //delete user
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send({msg:"User has been deleted..."});
      } catch (err) {
        res.status(500).send(err);
      }
    } catch (err) {
      res.status(404).send({msg: "User not found!"});
    }
  } else {
    res.status(401).send({msg: "You can delete only your account!"});
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //all proprieties without password
    const { password, ...others } = user;
    res.status(200).send(others);
  } catch (err) {
    res.status(500).send(err);
  }
});
//Get all users
router.get('/', async(req, res) => {
  try {
     const users = await  User.find()
      res.status(200).send({users, msg: "Getting all users with success"})
  } catch (error) {
      res.status(500).send({msg: "Can not getting users!"})
  }
})



module.exports = router;
