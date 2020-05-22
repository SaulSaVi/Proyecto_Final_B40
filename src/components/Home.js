import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Home() {

  const [search, setSearch] = useState('love');
  const [gifs, setGifs] = useState([]);
  const [similar, getSimilar] = useState([]);
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
    <div className="container-fluid">
      <div className="row ">
        <div className="col-2 sf-gray-primary">
          <ul className="list-group">
            <li className="list-group-item sf-list-group-item">
              <div className="spotifyname" >Spotify<span className="spotifyxname">X</span></div>
            </li>
            <li className="list-group-item sf-list-group-item">
              <span className="fa fa-home"></span>
              Inicio
            </li>
            <li className="list-group-item sf-list-group-item">
              <span className="fa fa-search"></span>
              Explorar
            </li>
            <li className="list-group-item sf-list-group-item">
              <a href="/create-playlist">
                <i class="fa fa-plus"></i>
                Crear nueva playlist
              </a>
            </li>
          </ul>

          <label>PLAYLISTS</label>
          <ul className="list-group">
            <li className="list-group-item sf-list-group-item">Tus me gusta</li>

          </ul>
          <br /><br />
        </div>
        <div className="col-8 sf-playlist">
          <br />
          <div className="row justify-content-between">
            <div className="col-2">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-lg-8">
                  <form onSubmit={findGiphy} className="form-inline justify-content-center">
                    <input className="form-control sf-input" onChange={(event) => setSearch(event.target.value)} placeholder={`${search}`} name="gif" placeholder="Love" />
                  </form>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="dropdown">
                <button className="btn dropdown-toggle sf-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  user name
                </button>
                <div className="dropdown-menu sf-dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item sf-dropdown-item" href="#"></a>
                  <a className="dropdown-item sf-dropdown-item" href="#"></a>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-6">
              <h4 className="title">Resultados de {`"${search}"`}</h4>
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-12">
              <a href="#" className="sf-link">GENERAL</a>
            </div>
          </div>

          <br />
          <div className="row">
            {gifs.length > 0 ? gifs.map((gif) => {
              return (

                <div className="col-12">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td><i class="fa fa-plus"></i></td>
                        <td> {`${gif.artist} - ${gif.name}`} </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            }) : (
                <div className="col-12">
                  <h3 className="title" >No hay resultados </h3>
                </div>
              )
            }
          </div>
        </div>
        <div className="col-2 sf-gray-primary">
          <div className="similar" >
            <h5 className="title">Artistas Similares</h5><br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;