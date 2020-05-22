import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import ModalDelete from './ModalDelete';


function Home() {


    // const [isOpenDelete, setIsOpenDelete] = useState(false);


    // PLAYLIST TRACKS
    const [todosAlta, setTodosAlta] = useState([]);
    // PLAYLIST TRACKS ENDS



    // PLAYLISTS
    const [playlistExist, setPlaylistExist] = useState([])
    const [isDeleted, setIsDeleted] = useState(true)
    const [playlist, setPlaylist] = useState()
  
    useEffect(() => {
      axios.get('https://proyectocintaroja-4600c.firebaseio.com/playlists.json')
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

            const alta = realData; //Filtra TODOS por Prioridad 3 los ALTOS
            setTodosAlta(alta);
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
  
      axios.delete(`https://proyectocintaroja-4600c.firebaseio.com/playlists/${id}.json`)
      .then(() => {
        setIsDeleted(!isDeleted);      
      }).catch((error) => console.log(error))
    }
  
    // FIN PLAYLIST


    //ADD SONG

    const [prioridad, setPrioridad] = useState('');


    const saveTodo = (event) => {

        event.preventDefault();
        axios.post(`https://proyectocintaroja-4600c.firebaseio.com/playlist/id.json`, 
        {prioridad}).then(() => {
          alert('Se a agregado la cancion');
          // clear();
        //   props.history.push('/'); Fuerza al redirect de crearTodo EL HISTORY SOLO REDIRECCIONA
        }).catch(() => {
          alert('Hubo un problema al agregar cancion');
        }) //Naming principle es6
    
      }
      
    //ADD SONG END

  const [search, setSearch] = useState('love');
  const [gifs, setGifs] = useState([]);
  const [similar, setSimilar] = useState([]);
  const URLSearch = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=a3baf3f68415f9e146751276a90005f7&format=json`;
  const urlSimilar = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${search}&api_key=a3baf3f68415f9e146751276a90005f7&format=json`;

  useEffect(() => {
    // console.log(search)
    axios.get(URLSearch).then((response) => {
      setGifs(response.data.results.trackmatches.track)
    }).catch((error) => {
      console.log(error)
    })
  },[])

  useEffect(() => {
    axios.get(urlSimilar).then((response) => {
        setSimilar(response.data.similarartists.artist);
    }).catch((error) => {
        console.log(error);
    })
  })
 

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
                <i className="fa fa-plus"></i>
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

            <div className="col-12 sf-playlist">
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
                      <h5 className="card-title mb-0">{`${playlist.playlist}`}</h5>
                      <button className="close" onClick={(() => { deletePlaylist(playlist.id) })}>
                        <span>&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            }) : (
              <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                <h3 className="mt-5 title text-center">No tienes playlists</h3>
              </div>
            )}
          </div>          
        </div>
            {/* <div className="col-2">
              <div className="dropdown">
                <button className="btn dropdown-toggle sf-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  user name
                </button>
                <div className="dropdown-menu sf-dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item sf-dropdown-item" href="#"></a>
                  <a className="dropdown-item sf-dropdown-item" href="#"></a>
                </div>
              </div>
            </div> */}
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
                      

                        {/* <td> <button onClick={() => setIsOpenDelete(true)} class="btn"><i class="fa fa-plus"></i></button> </td> */}
                        <div className="form-group">
                            <label htmlFor="">add playlist</label>
                            <select onChange={ (event) => setPrioridad(event.target.value) } name="prioridad" id="" className="form-control" value={prioridad} >
                                    { playlistExist.length > 0 ? playlistExist.map((playlist) => {
                                    return (
                                        <option value={`${playlist.playlist}: ${gif.artist} - ${gif.name}`} > {`${playlist.playlist}`} </option>
                                    )
                                    }) : (
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                                        <h3 className="mt-5 title text-center">No tienes playlists</h3>
                                    </div>
                                 )}
                            </select>
                        </div>

                       
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
            {
                similar.map((similar) => {
                    return(
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td> {`${similar.name}`} </td>
                                </tr>
                            </tbody>
                       </table>
                    )
                })
            }
          </div>
        </div>
      </div>
      {/* <ModalDelete open={isOpenDelete} close={setIsOpenDelete} /> */}
    </div>
  )
}

export default Home;