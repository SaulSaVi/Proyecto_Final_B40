import React, { useState, useEffect } from 'react';
import '../App.css';

function Sidebar(props) {
  return (
    <div className="col-2 sf-gray-primary">
      <ul className="list-group">
        <li className="list-group-item sf-list-group-item">
          <div className="spotifyname" >Spotify<span className="spotifyxname">X</span></div>
        </li>
        <li className="list-group-item sf-list-group-item">
          <a href="/">
            <span className="fa fa-home"></span>
            Inicio
          </a>
        </li>
        <li className="list-group-item sf-list-group-item">
          <a href="/">
            <span className="fa fa-search"></span>
            Explorar
          </a>
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
  )
}

export default Sidebar;