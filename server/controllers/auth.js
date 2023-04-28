import employee from "../models/employees.js";
import company from "../models/companies.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const empregister = async (req, res, next) => {
  console.log("body : "+req.body);
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newEmp = new employee({
      ...req.body,
      password: hash,
    });

    await newEmp.save();
    res.status(200).send("employee has been registered");
  } catch (err) {
    next(err);
  }
};
export const comregister = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //  let regex = new RegExp(/^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/);


    //  if (regex.test(req.body.CIN_No) != true) {
    //    return next(createError(400, "Invalid CIN No.!"));
    // }

    const newCom = new company({
      ...req.body,
      password: hash,
    });

    await newCom.save();
    res.status(200).send("Company has been registered.");
  } catch (err) {
    next(err);
  }
};

export const emplogin = async (req, res, next) => {
  console.log("in the emp login");
  try {
    const emp = await employee.findOne({ email: req.body.email });
    if (!emp) return next(createError(400, "Emp not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      emp.password
    );
    console.log(isPasswordCorrect)
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or Empname!"));


    res.status(200).send(emp);

  } catch (err) {
    next(err);
  }
}
export const comlogin = async (req, res, next) => {
  console.log("comes ")
  try {
    const com = await company.findOne({ email: req.body.email });
    console.log(com)
    if (!com) return next(createError(404, "Com not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      com.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or Comname!"));

    res.status(200).send(com);


  } catch (err) {
    next(err);
  }
}

export const updateCompany = async (req, res, next) => {
  console.log("inside update company!")
  try {
    const com = await company.updateOne(
      { email: req.body.email},
      { $set: { work : req.body.work} }
    )
    res.status(200).json(com);
    
  } catch (err) {
    next(err);
  }
}