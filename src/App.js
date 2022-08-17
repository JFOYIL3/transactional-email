import React, {useState} from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import List from './components/Pages/List';
import ListTest from './components/Pages/ListTest';
import Test from './components/Test'
import 'bootstrap/dist/css/bootstrap.css'
import CountTest from './components/Pages/CountTest';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/list' element={<ListTest />} />
        <Route path='/count' element={<CountTest />} />
      </Routes>
    </Router>
  );
}



const Home = () => {

  const [startDate, setStartDate] = useState(null);
  return (
    <div className='App'>
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