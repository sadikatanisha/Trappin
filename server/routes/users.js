const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  try {
    //generate pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user
    const user = await newUser.save();

    //send response
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Login

router.post("/login", async (req, res) => {
  // res.json("login");
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong user name or password");

    //validate pass
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong user name or password");
    //send res
    res.status(200).json({ _id: user._id, username: req.body.username });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
