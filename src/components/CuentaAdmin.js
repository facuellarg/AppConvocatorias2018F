import React,{Component} from 'react';
import store from './store';

export class CuentaAdmin extends Component{
    constructor(props){
        super(props)
    }

    render(){
        console.log(store.getState())
        return(
            <div className="container-fluid" align="center">
               <div className="col-md-6 col-md-offset-3">
                   <input className="form-control" id="inputName" ref="name" type="text" readOnly="readOnly" defaultValue={`${store.getState().name}`} ></input>
                   <input className="form-control" id="inputName" ref="lastname" type="text" readOnly="readOnly" defaultValue={`${store.getState().lastname}`}></input>
                   <div className="btn-group">
                       <button className="btn btn-default">Crear convocatoria</button>
                       <button className="btn btn-default">Ver Estadisticas</button>
                   </div>
               </div>
            </div>
        )
    }
}