const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todos");

const app = express();



app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/todo", todoRouter);

mongoose.connect("mongodb://localhost/auth-rest").then(()=>{
    console.log("connected to db");
    app.listen(3000, ()=>{
        console.log("connected on port ", 3000)
    })
    
}).catch((err)=>{
    console.log(err);
})
