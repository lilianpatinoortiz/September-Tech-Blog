const router = require("express").Router();
const { Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

// TODO: ADD withAuth TO ALL CALLS. EX: router.post("/", withAuth, async (req, res) => {
router.get("/", async (req, res) => {
  // find all comments
  Comment.findAll({
    include: {
      model: User, // includes its associated User
      attributes: ["name"],
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
  // find one comment
  try {
    const commentData = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: User, // includes its associated User
        attributes: ["name"],
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create comment
  try {
    const newComment = await Comment.create({
      ...req.body,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update comment
  try {
    const newComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!newComment) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete comment
  try {
    const newComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!newComment) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
