const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const router = express.Router();

router.post("/register", async(req,res)=>{
    try {
        const {username, email, password} = req.body;
        const isUserPresent = await User.findOne({email});
        if(isUserPresent){
            return res.status(400).json({success:false, data: "User already exists"});
        }
        const hasedPass = await bcrypt.hash(password, 8);
        const user= new User({
            username,
            email,
            password: hasedPass
        })
        await user.save();
        return res.status(201).json({success: true, data: "User created successfully"});
    } catch (error) {
        return res.status(500).json({success: false, data:"something went wrong"});
    }
     
});

router.post("/login", async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, data: "Check email and password and try again"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success:false, data: "Check email and password and try again"})
        }
        const token = jwt.sign({userId: user._id.toString()}, "thisisthescretkey", {expiresIn: "1hr"});
        return res.status(200).json({success:true, data: token});
    } catch (error) {
        return res.status(500).json({success: false, data:"something went wrong"});
    }
})


module.exports = router;