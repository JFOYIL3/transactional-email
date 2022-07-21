import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <form>
          <label>
            First Name: {" "}
            <input type="text" name='firstName' id="firstName" />
          </label>
          <br />
          <label>
            Last  Name: {" "}
            <input type="text" name='lastName' id="lastName" />
          </label>
          <br />
          <label>
            Email: {" "}
            <input type="text" name='email' id="email" />
          </label>
          <br />
          <label>
            Last Played: {" "}
            <input type="text" name='email' id="email" />
          </label>
          <br />
          <button onClick={() => sendEmail(
                                            document.getElementById("firstName").value,
                                            document.getElementById("lastName").value, 
                                            document.getElementById("email").value)} 
                  type="button">Submit
          </button>
        </form>
      </header>
    </div>
  );
}

function sendEmail(firstName, lastName, email){
  console.log(firstName);
  console.log(lastName);
  console.log(email);
  // npm install createsend-node

  // Authenticate with API Key
  var createsend = require('createsend-node');
  var env = require('dotenv');
  var auth = { apiKey: env.APIKEY };
  var api = new createsend(auth);

  // Create a details object
  var details = {};

  // Add the unique identifier for the smart email
  details.smartEmailID = '8b2c51cc-dbfd-463e-8367-f2322a903eb7';

  // Add the 'To' email address
  //details.to = "Blake Davis <jeff@longdriveagency.com>";
  details.to = `${firstName} ${lastName} <${email}>`; 

  // Add mail merge variables
  details.data = {
    "variableName": "variableNameTestValue"
  }


  // Send the smart email(and provide a callback function that takes an error and a response parameter)
  api.transactional.sendSmartEmail(details, function (err, res) {
      if (err) {
          /*do something*/
      } else {
          /*do something*/
      }
  });
}


export default App;
