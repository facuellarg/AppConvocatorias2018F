import React,{Component} from 'react';
import store from './store';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
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
                       <Link className="btn btn-default" to="/crearconvocatoria"> Crear convocatoria</Link>
                       <Link className="btn btn-default" to="/verestadisticas"> Ver Estadisticas</Link>
                       <Link className="btn btn-default" to="/convocatoriaaspirantes"> Ver Aspirantes</Link>
                   </div>
               </div>
            </div>
        )
    }
}