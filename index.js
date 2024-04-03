import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


// create express object named "app"
const app = express();
//create constant to specify the port
const port = 3000;

//login variables
var correctUser="mihaela";
var correctPassword = "1234";
var username = "";
var password = "";

//use middleware
app.use(bodyParser.json()); //to support hson encoded bodies
app.use(bodyParser.urlencoded({extended:true})); //to support url encoded bodies
app.use(cors())//allow client and server to share data when running on different servers


//check if server is working
app.get("/", (req, res)=>{
    res.send("Welcome to GP server");
})

//route for login logic
app.post("/login", (req, res)=>{
    username = req.body.username;
    password = req.body.password
    console.log(`Input username is ${username}`);
    console.log(`Input password is ${password}`);
    if (username === correctUser && password === correctPassword) {
        console.log("Much success!");
    } else {
        console.log("Wrong credentials");
    }

})


//start server on specified port
app.listen(port, ()=>{
    console.log (`Server is running on port ${port}`);
})

