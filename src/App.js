import React, {useState} from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 

function App() {
  const [startDate, setStartDate] = useState(null);
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
            Last Played:
          </label>
          <DatePicker 
            id='lastPlayed'
            selected={startDate} 
            onChange={(date) => setStartDate(date)}
            maxDate={new Date()} 
          />
          <br />
          <button onClick={() => sendEmail(
                                            document.getElementById("firstName").value,
                                            document.getElementById("lastName").value, 
                                            document.getElementById("email").value,
                                            document.getElementById("lastPlayed").value)} 
                  type="button">Submit
          </button>
        </form>
      </header>
    </div>
  );
}

function sendEmail(firstName, lastName, email, lastPlayed){
  fetch(`http://localhost:5000/express_backend?firstName=${firstName}&lastName=${lastName}&email=${email}&lastPlayed=${lastPlayed}`)
    .then((res) => {
      if (res.ok){
        alert("IT WORKED");
      }else{
        alert("THERE WAS AN ERROR");
      }
    })
}

export default App;