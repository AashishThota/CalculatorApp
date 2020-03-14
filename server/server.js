
const express =  require("express");

const http = require('http');
const app = express();
const path = require("path");
const cors=require('cors');
const server = http.Server(app);

const io=require("socket.io")(server,{
  origins:'*:*'
})
var allowedOrigins = "https://5e6c1ea8d419e23954933896--modest-johnson-b7c624.netlify.com:*";
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const uri = "mongodb+srv://Aashish:Sairam42@cluster0-rdg7o.gcp.mongodb.net/test?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;
var connectedUserNames = {};
var name;


io.on("connection",(socket)=>{
  console.log("connected")
  socket.emit("welcome",(data)=>{
   name=data
  })
  socket.on("sendingOperation",(data)=>{
    console.log("data recieved")
    console.log(data)
    io.emit("catchData",data);
    MongoClient.connect(uri,(err,db)=>{
      if (err) throw err;
      var dbcal=db.db("calculator_db");
      dbcal.collection("calculations").insertOne(data,(err,res2)=>{
        if (err) throw err;
        name=data.username
        console.log("inserted in db");
        dbcal.collection("calculations").find({timestamp:{ $gte: data.timestamp}}).sort({_id:-1}).limit(10).toArray( (err , collection) => {
          if(err) throw err;
          console.log("Record Read successfully");
          console.log(collection);
        
           

          

        });
        db.close();
      });
    });
      
    
  });
  
  socket.on("disconnect",(data)=>{
    
    MongoClient.connect(uri,(err,db)=>{
      if (err) throw err;
      var dbcal=db.db("calculator_db");
      
    dbcal.collection("calculations").deleteMany({'username':name}, function (e, coll) {
      if(e) throw e;
      console.log("deleted");
      
      db.close();
    });
  });
    console.log("client disconnected")
  });
});



const port = process.env.PORT || 5000;





//app.use(express.static(path.join(__dirname, 'public')));


app.all('/', (req, res) => {
  res.send("server is up");
});

server.listen(port, ()=>{
    console.log("Sever running in port : "+ port);
});