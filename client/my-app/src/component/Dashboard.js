import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'
// import {useHistory} from 'react-router-dom'

export default function Dashboard() {
  const history = useNavigate();
  const [quote, setQuote] = useState({
    quote: "",
  });
  const [tempQuote, setTempQuote] = useState({
    quote: "",
  });
  const [userData,setUserData]= useState({
    name:"",
    email:""
  })

  //-------------------------------------------------------------
  // let decoded = jwt_decode(token)

async function populateQuote() {
    const response = await fetch("http://localhost:5000/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();

    if (data.status === "success") {
      console.log(data)
      setQuote({quote:data.userDetail.quote});
      console.log(data)
      setUserData({
        name:data.userDetail.name,
        email:data.userDetail.email
      })
      // setQuote({quote:data.quote});
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        history.replace("/login");
      } else {
        console.log("founded");
        populateQuote();
      }
    }
  }, []);
  //-----------------------------------------------------------------

  async function submitted(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(tempQuote),
    });
    const data = await response.json();
    if (data.status === "success") {
      console.log(data);
      setQuote(tempQuote);
     
    } else {
      alert(data.error);
    }
      
    setTempQuote({
      quote:""
    })

    // console.log(quote);
    // console.log(tempQuote);
  }

  return (
    <div className="quote--block">
      <h1>welcome to your dashboard </h1>
      <div className="user--detail">
        <h2>--User Detail--</h2>
        <h3>{userData.name}</h3>
        <h3>{userData.email}</h3>
      </div>
      <h2>
        <span>status:</span> {quote.quote || "no quote found"}</h2>
      <form onSubmit={submitted}>
        <input
          type="text"
          name="quote"
          id="quote"
          value={tempQuote.quote}
          onChange={(e) => setTempQuote({ quote: e.target.value })}
        />
        <button>Update your Quote!</button>
      </form>
    </div>
  );
}
