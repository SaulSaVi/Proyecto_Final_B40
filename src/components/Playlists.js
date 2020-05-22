import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Sidebar from './Sidebar';
import Aside from './Aside';

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
        <Sidebar/>

        <div className="col-8 sf-playlist">
          <div className="row justify-content mt-4">
            { playlistExist.length > 0 && (
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4">
                <h3 className="title">Tus playlist</h3>
              </div>
            ) }
              
            { playlistExist.length > 0 ? playlistExist.map((playlist) => {
              return (
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 pl-0 pr-0">
                  <div className="card playlist text-center">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h6 className="card-title mb-0">{playlist.playlist}</h6>
                      <button className="close" onClick={(() => { deletePlaylist(playlist.id) })}>
                        <span>&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            }) : (
              <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                <h3 className="title">No tienes playlists</h3>
              </div>
            )}
          </div>          
        </div>
        
        <Aside />
      </div>
    </div>
  
  )
}

export default Playlists;