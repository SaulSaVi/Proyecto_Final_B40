import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Playlists() {
  const [playlistExist, setPlaylistExist] = useState([])
  const [isDeleted, setIsDeleted] = useState(true)
  const [playlist, setPlaylist] = useState()

  useEffect(() => {
    axios.get('https://proyectofinalb40.firebaseio.com/playlists.json')
      .then((response) => {
        if (response.data) {
          const playlists = Object.entries(response.data)

          const realData = playlists.map((playlist) => {
            const [id, data] = playlist;
            return {
              id,
              ...data
            }
          })
        
          const playlistE = realData
        
          setPlaylistExist(playlistE)
        } else {
          setPlaylistExist([])
        }
        
      }).catch((error) => {
        console.log(error)
      })
  }, [isDeleted])

  const deletePlaylist = (id) => {
    console.log('se elimina playlist')

    axios.delete(`https://proyectofinalb40.firebaseio.com/playlists/${id}.json`)
    .then(() => {
      setIsDeleted(!isDeleted);      
    }).catch((error) => console.log(error))
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
                <i className="fa fa-plus"></i>
                Crear nueva playlist
              </a>
            </li>
            <li className="list-group-item sf-list-group-item">
              <a href="/playlists">
                <i className="fa fa-eye"></i>
                Ver tus playlists
              </a>
            </li>
          </ul>

          <label>PLAYLISTS</label>
          <ul className="list-group">
            <li className="list-group-item sf-list-group-item">Tus me gusta</li>
          </ul>
        </div>
        <div className="col-8 sf-playlist">
          <div className="row justify-content mt-5">
            {
              playlistExist.length > 0 && (
                <h4 className="title">Tus playlist</h4>
              )
            }
            { playlistExist.length > 0 ? playlistExist.map((playlist) => {
              return (
                <div className="col-12 col-sm-3 col-md-3 col-lg-3 mb-5">
                  <div className="card text-center">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title mb-0">{playlist.playlist}</h5>
                      <button className="close" onClick={(() => { deletePlaylist(playlist.id) })}>
                        <span>&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            }) : (
              <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                <h3 className="mt-5 text-center">No hay playlists</h3>
              </div>
            )}
          </div>          
        </div>
        <div className="col-2 sf-gray-primary">
          <div className="similar" >
            <h5 className="title">Artistas Similares</h5>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default Playlists;