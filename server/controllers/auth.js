const { compare, hash } = require("bcrypt");
const {loginValidator} = require("../validation");
const { Admin } = require("../models");
const { serverErrs } = require("../helpers/customError");
const generateToken = require("../helpers/generateToken");

const adminRegister = async (req, res) => {
  if (req.body.secret !== process.env.MY_SETUP_SECRET) {
    throw serverErrs.UNAUTHORIZED("Unauthorized here")
  }
  const { name, email, password } = req.body;


  const existingAdmin = await Admin.findOne({
    where: {
      email,
    },
  });
  if (existingAdmin) throw serverErrs.BAD_REQUEST("Admin is already existed");

  const hashedPassword = await hash(password, 12);

  const newAdmin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  await newAdmin.save();
  const { id } = newAdmin;
  const token = await generateToken({
    UserId: id,
    name,
  });
  res.send({
    status: 201,
    msg: "successful creating Admin",
    token: token,
  });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    await loginValidator.validateAsync({ email, password });
    const admin = await Admin.findOne({
      where: {
        email,
      },
    });
    if (!admin) throw serverErrs.BAD_REQUEST("Email not found");
  
    const isPasswordValid = await compare(password, admin.password);
    if (!isPasswordValid) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");
  
    const { id, name } = admin;
    const token = await generateToken({
      AdminId: id,
      name,
    });
  
    res.send({
      status: 200,
      msg: "successful login",
      token: token,
    });
  };
  module.exports = {adminRegister,login};  