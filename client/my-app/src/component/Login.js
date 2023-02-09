import React, { useState } from "react";
import './Login.css'


// another way 
export default  function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitted(e) {
    e.preventDefault();
    console.log(email,password);

    const response = await fetch('http://localhost:5000/api/login',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
        
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setEmail('')
    setPassword('')

    const data = await response.json()
   
    if(data.user){
      localStorage.setItem('token',data.user)
      console.log("successful login")
      window.location.href='/quote'
    }
    else{
      alert('please check your username and password')
    }

    // console.log(data.user)
    // console.log(data)
  }

  


  return (
    <div className="login--block">
      <form onSubmit={submitted}>
       
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email-id"
        />

        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">SIGN IN</button>
      </form>
    </div>
  );
}
