const Register = require("../Models/RegisterSchema");
const bcrypt = require("bcrypt");

// GET METHOD FOR REGISTER USER
const getRegister = async (req, res) => {
  try {
    const data = await Register.find();
    res.status(200).json({
      status: "success",
      message: "Data Fetched Successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// POST METHOD FOR REGISTER USER
const postRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const data = await Register.create({
      firstname: req.body.firstname,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      retypePassword: hashedPassword,
    });
    if (data) {
      return res.status(201).json({
        status: "success",
        message: "Data Inserted Successfully",
        data,
      });
    } else {
      return res.status(400).json({
        status: "fail",
        message: "Data Not Inserted",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// LOGIN USER
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Email not registered",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect password",
      });
    }
    // Successful login
    return res.status(200).json({
      status: "success",
      message: "Login Successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  getRegister,
  postRegister,
  Login,
};
