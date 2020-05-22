import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const createUser = (event) => {
    event.preventDefault();
    // FIREBASE GRECIA
    // axios.post('https://playlist-app-918cf.firebaseio.com/users.json', 

    // FIREBASE NAT
    axios.post('https://proyectofinalb40.firebaseio.com/users.json', 
    {email, password}).then((response) => {
      console.log(response.status)
      alert('Tu usuario se ha registrado');
      // clear();
    }).catch(() => {
      alert('Hubo un problema al crear tu usuario');
    })
  }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                        <div class="card">
                            <form class="box">
                                <h1>Login</h1>
                                <p class="text-muted"> Please enter your login and password!</p> <input type="text" name="" placeholder="Username" /> <input type="password" name="" placeholder="Password"/> <a class="forgot text-muted" href="#">Forgot password?</a> <input type="submit" name="" value="Login" href="#" />
                                <div class="col-md-12">
                                    <ul class="social-network social-circle">
                                        <li><a href="#" class="icoFacebook" title="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#" class="icoTwitter" title="Twitter"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="#" class="icoGoogle" title="Google +"><i class="fab fa-google-plus"></i></a></li>
                                    </ul>
                                </div>
                            </form>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;