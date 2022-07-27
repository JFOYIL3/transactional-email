import React from 'react';
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
  fetch(`http://localhost:5000/express_backend?firstName=${firstName}&lastName=${lastName}&email=${email}`);
}

export default App;