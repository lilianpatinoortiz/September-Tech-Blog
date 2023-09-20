const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postsRoutes = require("./postsRoutes");

router.use("/users", userRoutes);
router.use("/posts", postsRoutes);

router.use("/", (req, res) => {
  res
    .status(404)
    .json("Hello from api! Please try /users or /posts to get data.");
});

module.exports = router;
