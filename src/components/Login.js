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
            { email, password }).then((response) => {
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
                <div className="col-12 col-lg-8 col-md-8 col-sm-8">
                    <form action="./Home.js" onSubmit={createUser}>
                    <div className="form-group">
                        <label className="text-left flex" htmlFor="">User:</label>
                        <input type="text" className="form-control" name="email" placeholder="Name" required
                        value={email} onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-left flex" htmlFor="">Password:</label>
                        <input type="password" className="form-control" name="password" placeholder="Password" required
                        value={password} onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-info">Save</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}



export default Login;