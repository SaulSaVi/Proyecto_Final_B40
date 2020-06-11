import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Sidebar from './Sidebar';
import Aside from './Aside';

function Home() {

  const [search, setSearch] = useState('love');
  const [gifs, setGifs] = useState([]);
  const URLSearch = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=a3baf3f68415f9e146751276a90005f7&format=json`;
  
  // Artistas similares
  const [similar, setSimilar] = useState([]);
  const urlSimilar = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${search}&api_key=a3baf3f68415f9e146751276a90005f7&format=json`;

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

  // Artistas similares
  useEffect(() => {
    axios.get(urlSimilar).then((response) => {
        setSimilar(response.data.similarartists.artist);
    }).catch((error) => {
        console.log(error);
    })
  })

  return (
    <div className="container-fluid">
      <div className="row ">
        <Sidebar/>

        <div className="col-8 sf-playlist">
          <div className="row justify-content-between mt-4 mb-4">
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
                  Log in: Usuario
                </button>
                <div className="dropdown-menu sf-dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item sf-dropdown-item" href="#">Nuevo usuario</a>
                  <a className="dropdown-item sf-dropdown-item" href="#">Ingresar</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mb-4">
            <div className="col-12">
              <h4 className="title">Resultados de {`"${search}"`}</h4>
            </div>
          </div>
         
          <div className="row">
            {gifs.length > 0 ? gifs.map((gif) => {
              return (

                <div className="col-12 pl-0 pr-0">
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
        
        {/* <Aside /> */}
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
    </div>
  )
}

export default Home;