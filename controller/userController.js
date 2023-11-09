
const mysql = require ('mysql2')

const connections = mysql.createConnection({
    // host:"127.0.0.1",
    host:"localhost",
    user:"root",
    password:"Irshad@123",
    database:"restaurant"
})
connections.connect((err)=>{
    if(err){
    console.error(`Error connecting to MySQL: ${err.message}`);
    return;
    } 
    console.log("database created succesfully");
})

const Home=(req,res,next)=>{
    res.send("server working")
}

module.exports={Home}