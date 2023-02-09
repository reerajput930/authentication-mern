import React, { useState } from "react";
import './Register.css'

export default function Register() {
  const [formUser, setFormUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  async function submitted(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    // console.log(res)
    setFormUser({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
    
    const data = await response.json()
     console.log(data.status)
     if(data.status !="failed"){
       window.location.href='/login'
     }
     else{
      alert('Fill all the data Carefully')
     }
    
  }

  return (
    <div className="register--block">
      <form onSubmit={submitted}>
        <input
          type="text"
          name="name"
          value={formUser.name}
          onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
        
          value={formUser.email}
          onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
          placeholder="Email-id"
        />

        <input
          type="password"
          name="password"
          value={formUser.password}
          onChange={(e) =>
            setFormUser({ ...formUser, password: e.target.value })
          }
          placeholder="Password"
        />
        <input
          type="password"
          name="confirmpassword"
          value={formUser.confirmpassword}
          onChange={(e) =>
            setFormUser({ ...formUser, confirmpassword: e.target.value })
          }
          placeholder="Confirm Password"
        />
        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
}
