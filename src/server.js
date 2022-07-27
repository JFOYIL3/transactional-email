const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });

  // Authenticate with API Key
  var createsend = require('createsend-node');
  const dotenv = require("dotenv");
  const date = require('date-and-time');
  const now = new Date();
  const value = date.subtract(now, new Date(req.query.lastPlayed));

  dotenv.config({ path: ".env" });
  var auth = { apiKey: process.env.APIKEY };
  var api = new createsend(auth);

  // Create a details object
  var details = {};

  // Add the unique identifier for the smart email
  details.smartEmailID = '8b2c51cc-dbfd-463e-8367-f2322a903eb7';

  // Add the 'To' email address
  //details.to = "Blake Davis <jeff@longdriveagency.com>";
  details.to = `${req.query.firstName} ${req.query.lastName} <${req.query.email}>`; 

  // Add mail merge variables
  details.data = {
    "variableName": `IT'S BEEN ${parseInt(value.toDays())} DAYS SINCE YOU LAST PLAYED!`
  }

  // Send the smart email(and provide a callback function that takes an error and a response parameter)
  api.transactional.sendSmartEmail(details, function (err, res) {
      if (err) {
          /*do something*/
          console.log("ERROR")
      } else {
          /*do something*/
          console.log("YOU DID IT")
      }
  });
}); 