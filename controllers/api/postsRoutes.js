const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// TODO: ADD withAuth TO ALL CALLS. EX: router.post("/", withAuth, async (req, res) => {
router.get("/", async (req, res) => {
  // find all posts
  Post.findAll({
    include: {
      model: Comment, // includes its associated Comments
      attributes: ["id", "description", "date_created"],
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "There are no posts." });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  // find one post
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Comment, // includes its associated Comments
        attributes: ["id", "description", "date_created"],
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create post
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update post
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete post
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
