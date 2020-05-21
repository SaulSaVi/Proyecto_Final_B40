import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
// import Playlist from './Playlist';

function App() {

  // R E G I S T R O
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


  // P L A Y L I S T
  const [playlistExist,setPlaylistExist] = useState([])

  useEffect(() => {
    axios.get('https://proyectofinalb40.firebaseio.com/playlists.json')
      .then((response) => {
        // console.log(response.data) //Esto me trajo firebase

        const playlists = Object.entries(response.data).reverse()
        // console.log(playlists)
        const realData = playlists.map((todo) => {
            const [id,data] = todo; 
            return {
                id,
                ...data
            }
        } )
        // console.log(realData)
        const playlistE = realData
        setPlaylistExist(playlistE)

    }).catch((error) => {
        console.log(error)
    })
  }, [])


  // C r e a r   l a   P l a y l i s t
  const [playlist, setPlaylist] = useState('');

  const clear = () => {
    console.log('aqui se deberia limpiar todooo')
    setPlaylist('')
  } 

  const createPlaylist = (event) => {
    event.preventDefault();

    axios.post('https://proyectofinalb40.firebaseio.com/playlists.json',
    {playlist}).then((response) => {
      // console.log(response.status)
      alert('Tu playlist se a agregado correctamente');
      clear();
    }).catch((error) => {
      alert('Hubo un problema al crear tu playlist');
    })
  }









  // S E A R C H
  const [search, setSearch] = useState('love');
  const [gifs, setGifs] = useState([]);
  const URLSearch = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=a3baf3f68415f9e146751276a90005f7&format=json`;
  useEffect(() => {
    // console.log(search)
    axios.get(URLSearch).then((response) => {
      setGifs(response.data.results.trackmatches.track)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const findGiphy = (event) => {
    event.preventDefault()
    axios.get(URLSearch).then((response) => {
      setGifs(response.data.results.trackmatches.track)
    }).catch((error) => {
      console.log(error)
    }) 
  }


  return (
    <div className="App">
      {/* R E G I S T R O */}
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
      

      {/* P L A Y L I S T */}
      <div className="container">
        <div className="row justify-content-center">  
          <div className="col-12 col-lg-8 col-md-8 col-sm-8">
            <h3>SI HAY  P L A Y L I S T</h3>
          </div> 

          { playlistExist.map((todo) => {
              return(
                <div className="col-12 col-sm-8 col-md-8 col-lg-8">
                  <div className="">
                    <div className="card-header">
                      Playlist: {todo.playlist}
                      {/* <button className="close" onClick={() => props.delete() }>
                        <span>&times;</span>
                      </button> */}
                    </div>
                    <div className="card-footer text-center">
                      {/* <button onClick={() => props.edit() } className="btn btn-info">Editar</button> */}
                    </div>
                  </div>
                </div>
              )
          }) }
          
        </div>

        <div className="row">
          <div className="col-12 col-lg-8 col-md-8 col-sm-8">
            <h3>C R E A R   P L A Y L I S T</h3>
          </div>

          <div className="col-12 col-lg-8 col-md-8 col-sm-8">
            <form action="" onSubmit={createPlaylist}>
              <div className="form-group">
                <label className="text-left flex" htmlFor="">Name playlist:</label>
                <input type="text" className="form-control" name="playlist" placeholder="Name of playlist" required
                  value={playlist} onChange={(event) => setPlaylist(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-info">Guardar Playlist</button>
            </form>
          </div>
        </div>
      </div>


      
      {/* S E A R C H */}
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
                      <h5 className="card-title">{gif.name}</h5>
                      <h5 className="card-title">{gif.artist}</h5>
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
        </div>
      </div>
    </div>
  );
}

export default App;
