const express = require("express");
const User = require("../model/user");
const authenticate = require("../middleware/auth")
const router = express.Router();


router.get("/:id", authenticate, async(req,res)=>{
   try {
    const {id} = req.params;
    const user = await User.findById(id);
    if(!user){
        return res.status(400).json({success:false, data: "User not found"})
    }
    delete user._doc.password;
    return res.status(200).json({success:true, data: user});
   } catch (error) {
        return res.status(500).json({success:false, data: "something went wrong"})
   }
})

router.put("/:id", authenticate, async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        return res.status(200).json({success:true, data: "Updated successfully"});
    } catch (error) {
        return res.status(500).json({success:false, data: "something went wrong"})
    }
})

router.delete("/:id", authenticate, async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        return res.status(200).json({success:true, data: "Deleted successfully"});
    } catch (error) {
        return res.status(500).json({success:false, data: "something went wrong"})
    }
})

module.exports = router;