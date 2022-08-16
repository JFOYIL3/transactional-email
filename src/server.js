const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const {createPool} = require('mysql');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(fileUpload());


// Upload endpoint
app.post('/upload', (req, res) => {
  if(req.files === null){
    return res.status(400).json({msg: 'No file uploaded'});
  }
  const file = req.files.file;
  file.mv(`${__dirname}/uploads/${file.name}`, err => {
    if(err){
      console.error(err);
      return res.status(500).send();
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
  })
})


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));


app.post("/uploaded", (req, res) => {
  setTimeout(() => {
    console.log('File uploaded');
    return res.status(200).json({resutl: true, msg: 'file-uploaded'});
  }, 3000);
});

app.delete("/uploaded", (req, res) => {
  console.log('File deleted');
  return res.status(200).json({resutl: true, msg: 'file-deleted'});
});



// create a GET route
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });

  // Authenticate with API Key
  var createsend = require('createsend-node');
  const dotenv = require("dotenv");
  const date = require('date-and-time');
  const now = new Date();

  dotenv.config({ path: ".env" });
  var auth = { apiKey: process.env.APIKEY };
  var api = new createsend(auth);

  // assign the data
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const email = req.query.email;
  const lastPlayed = req.query.lastPlayed;
  const value = date.subtract(now, new Date(req.query.lastPlayed));

  // Create a details object
  var details = {};

  // Add the unique identifier for the smart email
  details.smartEmailID = '8b2c51cc-dbfd-463e-8367-f2322a903eb7';

  // Add the 'To' email address
  //details.to = "Blake Davis <jeff@longdriveagency.com>";
  details.to = `${firstName} ${lastName} <${email}>`; 

  // Add mail merge variables
  details.data = {
    "variableName": `IT'S BEEN ${parseInt(value.toDays())} DAYS SINCE YOU LAST PLAYED!`
  }

  // Send the smart email(and provide a callback function that takes an error and a response parameter)
  api.transactional.sendSmartEmail(details, function (err, res) {
      if (err) {
        /*do something*/
        //alert("ERROR"); //<-- this gets an error, i have no idea...
      } else {
          const pool = createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'email_test',
            connectionLimit: 10
          });

          pool.query(`insert into user (firstName, lastName, email, lastPlayed) values ('${firstName}', '${lastName}', '${email}', '${lastPlayed}')`, (err, result, fields) => {
            if(err){
                return console.log(err);
            }
            return console.log(result);
          });
          alert("YOU DID IT");
      }
  });
}); 