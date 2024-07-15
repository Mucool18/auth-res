const express = require("express");
const Todo = require("../model/todos");
const authenticate = require("../middleware/auth")
const router = express.Router();

router.post("/createTodo", authenticate, async(req, res)=>{
    try {
        const {title, description} = req.body;
        if(!title || !description){
            return res.status(400).json({success: false, data: "Invalid body"})
        }
        const todo = new Todo({title, description});
        await todo.save();
        res.status(201).json({success: true, data: "Created Successfully"})
    } catch (error) {
        res.status(500).json({success: false, data: "Something went wrong"})
    }
});

router.get("/:id", authenticate, async(req,res)=>{
    try {
     const {id} = req.params;
     const todo = await Todo.findById(id);
     if(!todo){
         return res.status(400).json({success:false, data: "Todo not found"})
     }
     return res.status(200).json({success:true, data: todo});
    } catch (error) {
         return res.status(500).json({success:false, data: "something went wrong"})
    }
 })
 
 router.put("/:id", authenticate, async(req,res)=>{
     try {
         const {id} = req.params;
         const todo = await Todo.findByIdAndUpdate(id, req.body);
         return res.status(200).json({success:true, data: "Updated successfully"});
     } catch (error) {
         return res.status(500).json({success:false, data: "something went wrong"})
     }
 })
 
 router.delete("/:id", authenticate, async(req,res)=>{
     try {
         const {id} = req.params;
         const todo = await Todo.findByIdAndDelete(id);
         return res.status(200).json({success:true, data: "Deleted successfully"});
     } catch (error) {
         return res.status(500).json({success:false, data: "something went wrong"})
     }
 })

module.exports = router;