
const mysql = require ('mysql2')
require('dotenv').config();
const connections = mysql.createConnection({
    // host:"127.0.0.1",
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})
connections.connect((err)=>{
    if(err){
    console.error(`Error connecting to MySQL: ${err.message}`);
    return;
    } 
    console.log("database created succesfully");
})

const Home = async (req, res, next) => {
    try {

        console.log('vannnn');
       
        console.log('Received data11', req.body);
        res.status(200).json({ message: "Data received successfully" });
    } catch (error) {
        console.error('Error in Home controller:', error);
        res.status(500).json({ error: "An error occurred" });
    }
};


module.exports={Home}