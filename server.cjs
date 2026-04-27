const express=require('express')
const app=express();
const corn = require('node-cron'); //cron jobs
const mysql=require('mysql2');

const port=8080;


db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"otp_auth"
})

db.connect((err)=>{
    if( err) throw err;
    console.log("Database connected Sucessfully....")
})


app.listen(port ,() =>{
    console.log("Your server is running on Port " + port);
})

corn.schedule('* * * * * *',()=>{
    var abc=Math.floor(Math.random()*10000);
    db.query(`Insert into otps(email,otp) values('temp@temp.com',`+ abc`)`,(error,result)=>{
        if(error) throw error;
    });
    console.log("Hello from DG...")
})

corn.schedule('*/30 * * * * *',()=>{
    db.query('Delete from otps',(error,result)=>{
        if(error) throw error;

        console.log("All entries are deleted...")

    });
})