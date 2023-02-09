import React,{useState} from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from "./component/Register";
import Login from "./component/Login";
// import Quote from "./component/Dashboard";
import Dashboard from "./component/Dashboard";
import Navigation from "./component/Navigation";

export default function App() {


  return (
    <>           
       <Navigation/>
    <Routes>
       <Route path="/register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/quote" element={<Dashboard/>}/>
    </Routes>
    </>
  );
}
