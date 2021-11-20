const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.name === req.body.name) {
      try {
        const updatedPost = await Post.findByIdAndUpdate (
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).send(updatedPost);
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(401).send("You can update only your post!");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.id === req.params.id) {
      try {
        await post.delete();
        res.status(200).send("Post has been deleted...");
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(401).send("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const name = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (name) {
      posts = await Post.find({ name });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;