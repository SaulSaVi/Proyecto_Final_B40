import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function CreatePlaylist(props) {

  // C r e a r   l a   P l a y l i s t
  const [playlist, setPlaylist] = useState('');

  const clear = () => {
    console.log('aqui se deberia limpiar todooo')
    setPlaylist('')
  }

  const createPlaylist = (event) => {
    event.preventDefault();

    axios.post('https://proyectofinalb40.firebaseio.com/playlists.json',
      { playlist }).then((response) => {
        // console.log(response.status)
        alert('Tu playlist se a agregado correctamente');
        clear();
        props.history.push('/playlists')
      }).catch((error) => {
        alert('Hubo un problema al crear tu playlist');
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
            <li className="list-group-item sf-list-group-item">
              <a href="/playlists">
                <i class="fa fa-eye"></i>
                Ver tus playlists
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
          
          <div className="row">
            <div className="col-12 col-lg-8 col-md-8 col-sm-8 mb-5">
              <h3 className="title">Crear playlist</h3>
            </div>
          </div>

          <div className="row justify-content mt-5">
            <div className="col-12 col-lg-8 col-md-8 col-sm-8 mb-5">
              <form action="" onSubmit={createPlaylist}>
                <div className="form-group">
                  <label className="text-left flex" htmlFor="">Nombre de la playlist</label>
                  <input type="text" className="form-control" name="playlist" placeholder="Nueva playlist" required
                    value={playlist} onChange={(event) => setPlaylist(event.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-info">Crear</button>
              </form>
            </div>

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

export default CreatePlaylist;