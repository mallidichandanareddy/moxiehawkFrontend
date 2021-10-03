import './App.css';
import Login from './components/Login/login';
import Register from './components/Register/Register';
import Admin from './components/Admin/Admin';
import React ,{useState,useEffect}from 'react'


import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from './components/Header/Header';
function App() {
const [isLoggedIn, setisLoggedIn] = useState('')
useEffect(() => {
  console.log('Error')
  setisLoggedIn(JSON.parse(localStorage.getItem('isLogin')))
})


  return (
    <div className="App">
     {isLoggedIn && <Header />}
       <Switch>
          <Route exact path="/"><Login/></Route>
          <Route exact path="/register"><Register/></Route>
          <Route exact path="/admin"><Admin/></Route>

          <Redirect  to="/" />

        </Switch>
    </div>
  );
}

export default App;
