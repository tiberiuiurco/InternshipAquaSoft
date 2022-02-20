const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    age: req.body.age
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
  });
};
exports.signin = (req, res) => {
  console.log(req.body);
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err, auth:false });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found.", auth: false });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          auth:false,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: '5000' // 24 hours
      });
      res.status(200).json({
        id: user._id,
        auth: true,
        name: user.name,
        email: user.email,
        age: user.age,
        accessToken: token
      });
/*
      console.log({
        id: user._id,
        email: user.email,
        age: user.age,
        accessToken: token
      });*/
    });
};