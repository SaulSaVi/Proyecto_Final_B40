import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Sidebar from './Sidebar';
import Aside from './Aside';

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
        console.log('Tu playlist se a agregado correctamente');
        clear();
        props.history.push('/playlists')
      }).catch((error) => {
        alert('Hubo un problema al crear tu playlist');
      })
  }

  return (
    <div className="container-fluid">
      <div className="row ">
        <Sidebar/>

        <div className="col-8 sf-playlist">
          <div className="row justify-content mt-4">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4">
              <h3 className="title">Crear nueva playlist</h3>
            </div>
          </div>
          <div className="row justify-content">
            <div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-5">
              <form action="" onSubmit={createPlaylist}>
                <div className="form-group mb-4">
                  <input type="text" className="form-control create" name="playlist" placeholder="Nueva playlist" required
                    value={playlist} onChange={(event) => setPlaylist(event.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-info">Crear</button>
              </form>
            </div>
          </div>          
        </div>
        
        <Aside />
      </div>
    </div>


  )
}

export default CreatePlaylist;