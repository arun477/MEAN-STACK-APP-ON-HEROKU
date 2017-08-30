"use strict";

let express = require('express');
let app = express();
let mongoUtil = require('./server/mongoUtil');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
mongoUtil.connect();

app.use(express.static(__dirname + '/client'));

app.get('/sports', (req,res)=>{
   let sports = mongoUtil.sports();
   sports.find().toArray((err,docs) => {
       console.log(docs);
       var sportNames = docs.map((sport) =>  sport.name);
        res.json(sportNames);
   });

});

app.get('/sports/:name', (req,res) => {
    let sportName = req.params.name;
    
    let sportDetails = mongoUtil.sports();
    sportDetails.find({name:sportName}).limit(1).next((err,docs) => {
         if (err) {
           res.sendStatus(400);

         }
           console.log('Sport doc is : '+ docs);
           res.json(docs);
    });

   })

   app.post('/sports/:name/medals', jsonParser, (req, res) => {
     let sportName = req.params.name;
     let newMedal = req.body.medal || {};

    if(!newMedal.division || !newMedal.year || !newMedal.country){
      res.sendStatus(400);
    }

     let sports = mongoUtil.sports();
     let query = {name:sportName};
     let update = {$push: {goldMedals:newMedal}};

     sports.findOneAndUpdate(query, update, (err, docs) => {
       if (err){
         res.sendStatus(400);
       }
        res.sendStatus(201);
     })

     console.log('Sport Name : ' + sportName);
     console.log('New Medal : ' + newMedal);

     
   })

app.listen(8181,()=>console.log('Server Listening On Port 8181'));