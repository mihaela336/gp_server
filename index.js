import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


// create express object named "app"
const app = express();
//create constant to specify the port
const port = 3000;

//use middleware
app.use(bodyParser.json()); //to support hson encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //to support url encoded bodies
app.use(cors())//allow client and server to share data when running on different servers


//check if server is working
app.get("/", (req, res) => {
    res.send("Welcome to GP server");
})


// get random station route
app.get("/random", (req,res)=>{
    const randomIndex = Math.floor(Math.random()* stations.length);
    res.json(stations[randomIndex]);
    console.log(stations[randomIndex]);

})

//get a speciffic station
app.get("/station/:id", (req,res)=>
{
    //get id from request
    const id= parseInt(req.params.id);
    //search for station id inside stations array
    const foundStation = stations.find((stations)=>stations.id===id);
    //sends station data to user
    res.json(foundStation);
    console.log(foundStation);

});

//POST a new station
app.post("/station",(req,res)=>{
    //create newStation object
    const newStation = {
        id: stations.length+1,
        stationName: req.body.name,
        stationAdress: req.body.adress,
    };
    //add newStationto stations
    stations.push(newStation);
    console.log(stations.slice(-1));
    console.log(newStation);
    res.json(newStation);
})

//PUT a station
app.put("/station/:id",(req,res)=>{
    const id= parseInt(req.params.id);
    const replacementStation ={
      id: id,
      stationName: req.body.name,
      stationAdress: req.body.adress,
    };
    const searchIndex =stations.findIndex((station)=>station.id===id);
    stations[searchIndex]=replacementStation;
    res.json(replacementStation);
    console.log(replacementStation);
  })

  //PATCH a station
  app.patch("/station/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const existingStation = stations.find((station) => station.id === id);
    const replacementStation = {
      id: id,
      stationName: req.body.name || existingStation.stationName,
      stationAdress: req.body.adress || existingStation.stationAdress,
    };
    const searchIndex = stations.findIndex((station) => station.id === id);
    stations[searchIndex] = replacementStation;
    console.log(stations[searchIndex]);
    res.json(replacementStation);
  });



//DELETE a station
app.delete("/station/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = stations.findIndex((station) => station.id === id);
    if (searchIndex > -1) {
      stations.splice(searchIndex, 1);
      res.sendStatus(200);
    } else {
      res
        .status(404)
        .json({ error: `station with id: ${id} not found. No stations were deleted.` });
    }
  });


//start server on specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// Test data for charging stations
var stations = [
    {
        id: 1,
        stationName: "Test station 1",
        stationAdress: " adress of Test station 1",
    },
    {
        id: 2,
        stationName: "Test station 2",
        stationAdress: " adress of Test station 2",
    },
    {
        id: 3,
        stationName: "Test station ",
        stationAdress: " adress of Test station 3",
    },
    {
        id: 4,
        stationName: "Test station 4",
        stationAdress: " adress of Test station 4",
    }, {
        id: 5,
        stationName: "Test station 5",
        stationAdress: " adress of Test station 5",
    },
];