const User = require("./../models/userModel");

const getAllData = async (req, res) => {
  const found = await User.find({});
  res.send(found);
};

const getAllDelete = async (req, res) => {
  const deleted = await User.findByIdAndDelete({ _id: req.params.id });
  res.send(deleted);
};

const getAllPost = async (req, res) => {
  const newUser = await User(req.body);
  await newUser.save();
  res.send(newUser);
};

module.exports = {
  getAllData,
  getAllDelete,
  getAllPost,
};
