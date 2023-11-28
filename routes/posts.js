const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

/* GET one post. */
router.get("/:id", async function (req, res) {
  try {
    const post = await knex("foodpost").where({ id: req.params.id }).first();
    res.json(post);
  } catch (error) {
    res.status(404).json({
      message: "Error when getting post.",
    });
  }
});

/* GET all posts. */
router.get("/", async function (req, res) {
  try {
    const post = await knex.from("user").innerJoin(
      "foodpost",
      "foodpost.user_id",
      "user.id"
    );
    res.json(post);
  } catch (error) {
    res.status(404).json({
      message: "Error when getting posts",
    });
  }
});

/* POST create post */
router.post("/", async function (req, res, next) {
  try {
    const user = await knex("user").where({ email: req.headers.email }).first();
    const newpostIds = await knex("foodpost").insert({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      user_id: user.id,
    });

    res.status(201).json(newpostIds[0]);
  } catch (error) {
    res.status(400).json({
      message: "Error while creating post",
      details: error,
    });
  }
});


/* DELETE post */
router.delete("/:id", async function (req, res) {
  try {
    await knex("foodpost").where({ id: req.params.id }).del();
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({
      message: "Error when deleting post",
      detail: error,
    });
  }
});

module.exports = router;
