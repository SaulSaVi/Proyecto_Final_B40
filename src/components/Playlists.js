import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Playlists() {
  const [playlistExist, setPlaylistExist] = useState([])

  useEffect(() => {
    axios.get('https://proyectofinalb40.firebaseio.com/playlists.json')
      .then((response) => {
        // console.log(response.data) //Esto me trajo firebase

        const playlists = Object.entries(response.data).reverse()
        // console.log(playlists)
        const realData = playlists.map((todo) => {
          const [id, data] = todo;
          return {
            id,
            ...data
          }
        })
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
      { playlist }).then((response) => {
        // console.log(response.status)
        alert('Tu playlist se a agregado correctamente');
        clear();
      }).catch((error) => {
        alert('Hubo un problema al crear tu playlist');
      })
  }

  return (
    <div className="playlists">
      <div className="container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8 col-md-8 col-sm-8">
              <h3>S I   H A Y  P L A Y L I S T</h3>
            </div>

            {playlistExist.map((todo) => {
              return (
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
            })}

          </div>

          <div className="row justify-content-center">
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
      </div>
    </div>
  )
}

export default Playlists;