import React , { useState } from 'react';
import '../App.css';
import axios from 'axios';
import Navbar from './Navbar';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const usuario
 
  const createUser = (event) => {
    event.preventDefault(); 

    axios.post('https://proyectofinalb40.firebaseio.com/users.json', 
    {email, password}).then((response) => {
      console.log(response.status)
      alert('Tu usuario se ha registrado');
      // clear();
    }).catch(() => {
      alert('Hubo un problema al crear tu usuario');
    })
  }


// function CreateTodo(props) {
//     const [user,setUser] = useState('');
//     const [todo,setTodo] = useState('');
//     const [prioridad, setPrioridad] = useState('3');
  
//     const clear = () => {
//       setPrioridad('3')
//       setTodo('')
//       setUser('')
//     }
  
    const saveTodo = (event) => {
      event.preventDefault();
      axios.post('https://proyectofinalb40.firebaseio.com/playlists.json', 
      { user,todo, prioridad}).then(() => {
        alert("Se a creado el Todo con exito")
        //clear()
        props.history.push('/') //Fuerza el redirect de crearTodo a home
      }).catch(() => {
        alert("Hubo un problema al crear el todo")
      }) //Naming principle Es6
  
    }

    function ModalEdit(props){
      const [playlist,setplaylist] = useState(props.todo.user.playlist)
     
  
      useEffect(() => {
          setPlaylist(props)
          setTodo(props.todo.todo)
          setPrioridad(props.todo.prioridad)
      },[props.todo]) //Con esto voy a capturrar los cambios que Home envia a modal
  
      const updateTodo = (event) => {
          event.preventDefault();
          axios.put(`https://todoapp-e1226.firebaseio.com/todos/${props.todo.id}.json`, 
                  {
                      user,
                      todo,
                      prioridad
                  }).then(() => {
                      props.close(false)          
                  }).catch((error) => alert(error))
  
      }
  
      return(
          <div className={props.open ? 'modal fade show' : 'modal fade'  } 
               style={{ display: props.open ? 'block' : 'none'  }}>
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title">Editar</h5>
                          <button className="close" onClick={ () => props.close(false)}>
                              <span>&times;</span>
                          </button>
                      </div>
  
                      <div className="modal-body">
                          <div className="row">
                              <div className="col-md-12 col-lg-12 col-sm-12">
                                  <form onSubmit={updateTodo}>
                                      <div className="form-group">
                                          <label htmlFor="">Nombre:</label>
                                          <input type="text" 
                                          value = {user}
                                          onChange={(event) => setUser(event.target.value) }
                                          className="form-control"  
                                          />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="">To-do:</label>
                                          <textarea className="form-control" 
                                          value={todo}
                                          onChange={(event) => setTodo(event.target.value)}
                                          name=""  cols="30" 
                                          rows="10">
                                          </textarea>
                                      </div>
                                      <div className="form-group" >
                                          <label htmlFor="">Prioridad:</label>
                                          <select 
                                          value={prioridad}
                                          onChange={(event) => setPrioridad(event.target.value) }
                                          className="form-control" name="" id="">
                                              <option value="3">Alta</option>
                                              <option value="2">Media</option>
                                              <option value="1">Baja</option>
                                          </select>
                                      </div>
                                      <button className="btn btn-info">Guardar</button>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
  
      )
  
  }
  
  export default ModalEdit;
  
  export default usuario;