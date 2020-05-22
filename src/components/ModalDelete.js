import React from 'react';
import axios from 'axios';




function ModalDelete(props){


  

    return(
        <div className={props.open ? "modal fade show" : "modal fade"} style={{display: props.open ? "block" : "none"}} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add song to playlist</h5>
                        <button className="close" onClick={() => props.close(false)} >
                            <span>&times;</span>
                        </button>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-danger" >
                            Aceptar
                        </button>
                        <button onClick={() => props.close(false)} className="btn btn-lite" >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete;