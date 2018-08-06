const User = require('../models/user.model');

exports.user_create = function (req, res) {
  let user = new User(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
  );

  user.save(function (err) {
    if (err) return next(err);
    res.send('User created!');
  });
};

exports.users = function (req,res) {
  User.find({}, function (err, users) {
    if(err) return next(err);
    res.send(users);
  });
}

exports.user_details = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.send(user);
  });
};

exports.user_update = function (req, res) {
  User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
    if (err) return next(err);
    res.send('User updated!');
  });
};

exports.user_delete = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('User deleted!');
  });
};