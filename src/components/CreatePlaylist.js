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
    <div className="playlists">
      <div className="container">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-12 col-lg-8 col-md-8 col-sm-8 mb-5">
              <h3 className="mt-5 text-center">Crear nueva playlist</h3>
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
            <div className="col-12 col-lg-8 col-md-8 col-sm-8">
              <a href="playlists">Ver todas tus playlists</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePlaylist;