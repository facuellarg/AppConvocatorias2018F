import React,{Component} from 'react';
import store from './store';
import PropTypes from "prop-types";

export class CuentaAdmin extends Component{
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.handleOnClickEstadisticas = this.handleOnClickEstadisticas.bind(this)
        this.handleOnClickCrearConvocatoria = this.handleOnClickCrearConvocatoria.bind(this)
    }

    handleOnClickEstadisticas(){
        this.context.router.history.push("/verestadisticas");

    }
    handleOnClickCrearConvocatoria(){
        this.context.router.history.push("/crearconvocatoria");
    }
    render(){
        console.log(store.getState())
        return(
            <div className="container-fluid" align="center">
               <div className="col-md-6 col-md-offset-3">
                   <input className="form-control" id="inputName" ref="name" type="text" readOnly="readOnly" defaultValue={`${store.getState().name}`} ></input>
                   <input className="form-control" id="inputName" ref="lastname" type="text" readOnly="readOnly" defaultValue={`${store.getState().lastname}`}></input>
                   <div className="btn-group">
                       <button className="btn btn-default" onClick={this.handleOnClickCrearConvocatoria}>Crear convocatoria</button>
                       <button className="btn btn-default" onClick={this.handleOnClickEstadisticas}>Ver Estadisticas</button>
                   </div>
               </div>
            </div>
        )
    }
}