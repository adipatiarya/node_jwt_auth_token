const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  // See if a user given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) return next(err);

    // If a user with email does exists, return an error
    if (existingUser) return res.status(422).send({ error: 'email is in use' });

    // If a user with email does NOT exists, create and save user record
    const user = new User({ email: email, password: password });
    user.save(function(err) {
      if (err) return next(err);
      // Response to user indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them token
  res.send({ token: tokenForUser(req.user) });
};
