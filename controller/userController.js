
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
    
        connections.query("SELECT * FROM Restaurent_Table", (err, results) => {
            if (err) {
              console.error(`Error querying data: ${err.message}`);
              res.status(500).send("Error querying data");
            } else {
              res.status(200).json({ message: "working", data: results });
              console.log(results);
            }
          });
       
    } catch (error) {
        console.error('Error in Home controller:', error);
        res.status(500).json({ error: "An error occurred" });
    }
};

const Adddata = async (req, res) => {
    try {
        const { info } = req.body;

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS Restaurent_Table (
                id INT AUTO_INCREMENT PRIMARY KEY,
                hotelname VARCHAR(255),
                address TEXT,
                phone TEXT,
                image VARCHAR(255)
            )
        `;

        connections.query(createTableQuery, (err, results) => {
            if (err) {
                console.error(`Error creating table: ${err.message}`);
                res.status(500).send("Error creating table");
                return;
            }

            const insertQuery = `
                INSERT INTO Restaurent_Table (hotelname, address, phone, image)
                VALUES (?, ?, ?, ?)
            `;

            // Array of values corresponding to the placeholders in the query
            const values = [info.hotelname, info.address, info.phone, info.image];

            // Execute the query
            connections.query(insertQuery, values, (err, results) => {
                if (err) {
                    console.error('Error inserting data into the database:', err);
                    res.status(500).json({ message: "Internal server error" });
                    return;
                }

                console.log('Data inserted successfully');
                res.json({ data: values });
            });
        });
    } catch (error) {
        console.error('Error in Adddata controller:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const UpdateData = async(req,res)=>{
    const { id, hotelname, address, phone, image, } = req.body;
  
    const updateQuery = `
      UPDATE Restaurent_Table
      SET hotelname= ?,
          address = ?,
          phone = ?,
          image = ?
      WHERE id = ?
    `;
  
    const values = [hotelname, address, phone, image,id ];
  
    connections.query(updateQuery, values, (err, results) => {
      if (err) {
        console.error(`Error updating data: ${err.message}`);
        res.status(500).send("Error updating data");
      } else {
        console.log("Data updated successfully.");
        res.status(200).json({messge:"updated Successfull",data:results});
      }
    });
}

const DeleteData=async(req,res)=>{
    const  id  = req.query.id;
  
    const deleteQuery = `
      DELETE FROM Restaurent_Table
      WHERE id = ?
    `;
  
    connections.query(deleteQuery, id, (err, results) => {
      if (err) {
        console.error(`Error deleting data: ${err.message}`);
        res.status(500).send("Error deleting data");
      } else {
        if (results.affectedRows > 0) {
          console.log(`Data with id ${id} deleted successfully.`);
          res.status(200).send(`Data with id ${id} deleted successfully.`);
        } else {
          console.log(`No data found with id ${id}.`);
          res.status(404).send(`No data found with id ${id}.`);
        }
      }
    });
}

module.exports = { Home, Adddata ,UpdateData,DeleteData};


  
// const Adddata=async(req,res)=>{
//     try {
//         const {info}=req.body
//         console.log(info);
//         console.log(info.image);
      

//         res.json({data:info})

//     } catch (error) {
//         res.status(503).json({message:"internal server error"})
//     }
// }


// module.exports={Home,Adddata}