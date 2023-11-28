const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

/* GET single user */
router.get("/:id", async function (req, res) {
  try {
    const user = await knex("user").where({ id: req.params.id }).first();
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: "User not found",
    });
  }
});

/* POST user create */
router.post("/", async function (req, res, next) {
  try {
    const newUserIds = await knex("user").insert(req.body);

    res.status(201).json(newUserIds[0]);
  } catch (error) {
    res.status(400).json({
      message: "Error while creating user",
      details: error,
    });
  }
});

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  const user = await knex("user").where({ email: email }).first();
  if (user) {
    if (user.password == password) {
      let token;
      try {
        token = jwt.sign(
          { username: user.user_name, email: email },
          "46546465465165544654231328745jdjfgjsfgjhnb"
        );
      } catch (error) {
        res.json({message: "Error when login user"}).status(500);
      }

      res.json({ 
        status: 200,
        token: token,
        userid: user.id,
        username: user.user_name,
      });
    } else {
      res.send({status:401, message:"Email or password is wrong"});
    }
  } else {
    res.send({status:401, message:"Email or password is wrong"});

  }
});



module.exports = router;
