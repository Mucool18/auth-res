const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.ObjectId, ref: "User"},
    address: String,
    mobileNo: Number
});

const UserDetail = mongoose.model("userDetail", userDetailsSchema);
module.exports = UserDetail;