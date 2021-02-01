const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
var axios = require("axios").default;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://deezerApp:!Wimpie@01@cluster0.hwejv.mongodb.net/mytable?retryWrites=true&w=majority"
const app = express();
const port = process.env.PORT || 5000;
var array=[];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


 //API Link from main page
app.post('/searchArtist', (req, res) => {

  console.log(req.body);

  var searchOption = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    params: {q: `${req.body.post}`},
    headers: {
      'x-rapidapi-key': '16f828f6aemshc4fcd98b72905dfp101b35jsnaa08dad206ea',
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };
  


    axios.request(searchOption).then( function (response) {
      array.push(response.data.data)

         res.send(JSON.stringify(array));
         array.splice(0,array.length)

      }).catch(function (error) {
         console.error(error);
  });

});

 //API Link from Artist detail page to get the artist picture and fan total

app.post('/artistDetail', (req, res) => {
  console.log(req.body);
  
  
  //NOTES:
  /* To do:
     1 - Connect to mongoDB Atlas "find" "req.body.post"

       MongoClient.connect(url, function(err, db) {
       if (err) throw err;
       var dbo = db.db("mydb");
       dbo.collection("customers").find({}).toArray(function(err, result) {
         2- If(result === req.body){
           array.push(result);
           res.send(JSON.stringify(array));
         }
         3 - if(result !== req.body){
            3.1 - MANGO DB MUST INSERT ITEMS
                       var myobj = { name: "Company Inc", address: "Highway 37" };
                       dbo.collection("customers").insertOne(myobj, function(err, res) {
                       if (err) throw err;
                       console.log("1 document inserted");
              
             3.2 AXIOS TO TO API CALL AND RES TO CLIENT
  });
         }
       if (err) throw err;
       console.log(result);
       db.close();
  });
});
  });
});
  */

  var artistOptions = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/artist/'+`${req.body.post}`,
    headers: {
      'x-rapidapi-key': '16f828f6aemshc4fcd98b72905dfp101b35jsnaa08dad206ea',
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  }
  axios.request(artistOptions).then(function (response) {
    array.push(response.data)
   
       res.send(JSON.stringify(array));
        array.splice(0,array.length)
            }).catch(function (error) {
  console.error(error);
       });
     });


 //API Link from Artist detail page to get the artist top 5 tracks

app.post('/artistDetailTop', (req, res) => {
  console.log(req.body);
  var artistOptions = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/artist/'+`${req.body.post}`+'/top',
    headers: {
      'x-rapidapi-key': '16f828f6aemshc4fcd98b72905dfp101b35jsnaa08dad206ea',
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  }
  axios.request(artistOptions).then(function (response) {
    array.push(response.data)
    
    res.send(JSON.stringify(array[0]));
    array.splice(0,array.length)
      }).catch(function (error) {
         console.error(error);
    });
 });

//API Link from Artist detail page to get the artist albums

app.post('/artistAlbums', (req, res) => {
  console.log(req.body);
  var artistOptions = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/artist/'+`${req.body.post}`+'/albums',
    headers: {
      'x-rapidapi-key': '16f828f6aemshc4fcd98b72905dfp101b35jsnaa08dad206ea',
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  }
  axios.request(artistOptions).then(function (response) {
    array.push(response.data.data)
    console.log(array)
    res.send(JSON.stringify(array));
    array.splice(0,array.length)
     }).catch(function (error) {
        console.error(error);
    });
  });

app.listen(port, () => console.log(`Listening on port ${port}`));