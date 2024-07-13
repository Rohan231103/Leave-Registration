const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const userValid = require('../validation/userValidation');

exports.userReg = async(req,res) => {
    try {
        const {error,value} = userValid.userValidation.validate(req.body);
        if(error){
            return res.status(422).json({
                error:error.details[0].message
            })
        }

        const { email,password } = value;

        const userExist = await userModel.findOne({email});

        if(userExist){
            return res.status(422).json({
                error: "User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = new userModel({
            ...value,
            password: hashPassword
        })

        await user.save();

        res.status(201).json({
            message:"User Registerd Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}

exports.userLogin = async(req,res) => {
    try {
        const {error,value} = userValid.userLoginValidation.validate(req.body);
        if(error){
            return res.status(400).json({
                error:error.details[0].message
            })
        }

        const {email,password} = value;

        const userLogin = await userModel.findOne({email});

        if(!userLogin){
            return res.status(400).json({
                error: "Invalid Credential"
            })
        }

        const isMatch = await bcrypt.compare(password, userLogin.password);

        if(!isMatch){
            return res.status(400).json({
                error: "Invalid Credential"
            })
        }
        const token = jwt.sign({
            email: userLogin.email,
            userId: userLogin._id,
            expiresIn: '24h' 
            },
            process.env.SECRET_KEY,
        )
        res.status(200).json({
            message: "Login succesfully",
            token:token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Server Error"
        })
    }
}
