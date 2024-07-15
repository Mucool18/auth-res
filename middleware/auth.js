const jwt = require("jsonwebtoken")
const authenticate = async (req, res, next)=>{
    try {
        console.log(req.headers)
        if(!req.headers["authorization"]){
            return res.status(401).json({success: false, data: "Authentication failed"})
        }
        console.log(req.headers["authorization"])
        const token = req.headers["authorization"].split("Bearer ")[1];
        console.log("roken - ", token);
        const decoded = jwt.verify(token, "thisisthescretkey");
        console.log(decoded)
        if(!decoded){
            return res.status(401).json({success: false, data: "Authentication failed"})
        }
        req.userId= decoded.userId;
        next();
        
    } catch (error) {
        return res.status(401).json({success: false, data: "Authentication failed"})
    }
}
module.exports = authenticate;