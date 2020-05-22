import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Playlists() {
  const [playlistExist, setPlaylistExist] = useState([])

  useEffect(() => {
    axios.get('https://proyectofinalb40.firebaseio.com/playlists.json')
      .then((response) => {
        // console.log(response.data) //Esto me trajo firebase

        const playlists = Object.entries(response.data)
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
        console.log(playlistE)
        setPlaylistExist(playlistE)
      }).catch((error) => {
        console.log(error)
      })
  }, [])

  const deletePlaylist = (playlistE) => {
    // Hard Delete - Borrar todo de la base de datos
    // Soft Delete - para el usuario parece que esta elimindao, pero dentro de la base de datos NO
    console.log('se elimina playlist')
    console.log(playlistE)
    // axios.delete(`https://proyectofinalb40.firebaseio.com/playlists/${playlistE.id}.json`)
    // .then(() => {
    //   // props.close(false)
    //   // console.log(response.data)
    //   console.log('se elimina')
    //   }).catch((error) => alert(error))
  }


  return (
    <div className="playlists">
      <div className="container">
        <div className="container">
          <div className="row justify-content mt-5">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-5">
              <h3 className="text-center">Tus playlist</h3>
            </div>
            { playlistExist.length > 0 ? playlistExist.map((todo) => {
              return (
                <div className="col-12 col-sm-3 col-md-3 col-lg-3 mb-5">
                  <div className="card text-center">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title mb-0">{todo.playlist}</h5>
                      <button className="close" onClick={() => deletePlaylist() } >
                        <span>&times;</span>
                      </button>
                    </div>
                    <div className="card-body">
                      <p className="card-text">....</p>
                      <a href="#" className="btn btn-info">Editar</a>
                    </div>
                  </div>
                </div>
              )
            }) : (
              <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                <h3 className="mt-5 text-center">No hay playlists</h3>
              </div>
            )}

            <div className="col-12 col-lg-12 col-md-12 col-sm-12">
              <a href="create-playlist">Crear nueva playlist</a>
            </div>

          </div>          
        </div>
      </div>
    </div>
  )
}

export default Playlists;