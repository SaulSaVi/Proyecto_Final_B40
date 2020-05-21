import React, { useState, useEffect } from 'react';
import navbar from './navbar';
import './App.css';
import axios from 'axios';


function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = (event) => {
    event.preventDefault();
    // FIREBASE NAT
    // axios.post('https://proyectofinalb40.firebaseio.com/users.json', 
    // FIREBASE GRECIA
    axios.post('https://playlist-app-918cf.firebaseio.com/users.json', 

    //// key:value,key:value,key:value,
    {email, password}).then((response) => {
      console.log(response.status)
      alert('Tu usuario se ha registrado');
      // clear();
    }).catch(() => {
      alert('Hubo un problema al crear tu usuario');
    })
  }


  // search
  // const URL = 'https://api.giphy.com/v1/gifs/search?api_key=ttAm40hnMkgbyQpH8pziLa1cC6Dm5l6a&q=';
  const [search, setSearch] = useState('love'); // La palabra por defecto sera rugrats al cargar la pagina
  const [gifs, setGifs] = useState([]);
  const URL = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=a3baf3f68415f9e146751276a90005f7&format=json`;
  useEffect(() => {
    console.log('Desde use effect')
    console.log(search)

    axios.get(URL).then((response) => {
      // En la siguiente liena de codigo se guarda 
      setGifs(response.data.results.trackmatches.track) // primer data es de axios, segundo data es de respuesta de giphy
    }).catch((error) => {
      console.log(error)
    })
  },[])

  const findGiphy = (event) => {
    event.preventDefault()  //Evita que se refresque la pagina al momento de hacer submit en el form
    axios.get(URL).then((response) => {
      // En la siguiente liena de codigo se guarda 
      console.log('response data: ',response.data)
      console.log('response name: ',response.data.results.trackmatches.track)
      setGifs(response.data.results.trackmatches.track) // primer data es de axios, segundo data es de respuesta de giphy
    }).catch((error) => {
      console.log(error)
    }) 
  }


  return (
    <div className="App">
      <navbar/>
      {/* REGISTRO */}
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 col-md-8 col-sm-8">
            <form action="" onSubmit={createUser}>
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
      {/* SEARCH */}
      <div className="container">
        SEARCH
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-lg-8">
              <form onSubmit={findGiphy} className="form-inline justify-content-center">
                <input className="form-control" 
                  onChange={(event) => setSearch(event.target.value)} 
                  placeholder={` ${search}`} 
                  name="gif"
                />
                <button type="submit" className="btn btn-success">Buscar</button>
              </form>
            </div>
          </div>

          <div className="row mt-5">
            { gifs.length > 0 ? gifs.map((gif) => { 
              return(

                <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                  <div className="card bg-dark text-white">
                      <h5 className="card-title">{gif.artist+" - "+gif.name}</h5>
                  </div>
                </div>
              )
            }) : (
                <div className="col-12">
                  <h3>No hay resultados </h3>
                </div>
              )
            }
          </div>

          {/* <h5 className="card-title">{gifs}</h5> */}
        </div>
      </div>
    </div>
  );
}

export default App;
