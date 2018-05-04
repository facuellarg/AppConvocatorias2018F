import React,{Component} from 'react';

import {Url} from './Url.js'
import PropTypes from "prop-types";
import {Forbbiden} from './Forbbiden'
import  './css/ConvocatoriaDetalles.css';

export class ConvocatoriaDetalles extends Component{
	static contextTypes = {
    router: PropTypes.object
	  }
	  constructor(props, context) {
     super(props, context);
			this.state = {convocation:[]}
	}
	componentWillMount(){
		if(!localStorage.getItem('token')){
			 return;
		}	
		this.setState({convocation:JSON.parse(localStorage.getItem('convocation'))})
		
	}
	handleOnClickAtras(){
		this.context.router.history.push("/Convocatorias")
	}

	render(){
			if(localStorage.getItem('token')){
				return(
                    <div className="panel panel-primary col-md-6 col-md-offset-3 " align="center">
                        <div className="panel-heading "><h3 className="panel-title">Detalles De La Conovocatoria</h3>
                        </div>
                        <div className="panel-body ">
                            <div  className="este" align="center">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <label >Nombre de la conovocatoria: </label>
                                        <p>{`${this.state.convocation.name}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Descripcion de la conovocatoria: </label>
                                        <p>{`${this.state.convocation.description}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Para estudiantes de: </label>
										<p>{`${this.state.convocation.level}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Finaliza el: </label>
										<p>{`${this.state.convocation.end_date}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Responsable de la Convocatoria: </label>
										<p>{`${this.state.convocation.admin.name}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Vacantes:</label>
										<p> {`${this.state.convocation.vacants}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Disponibilidad de tiempo requerida: </label>
										<p>{`${this.state.convocation.hours_per_week}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label> Estímulo económico mensual: </label>
										<p>${`${this.state.convocation.payout}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Duración de la vinculación(dias): </label>
										<p>{`${this.state.convocation.vacants}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Requisitos Generales:</label>

                                        {this.state.convocation.requirements.map((requeriment)=>
                                            <li>{requeriment.description}</li>
                                        )}

                                    </li>
                                    <li className="list-group-item">
                                        <label>Dependencias:</label>

                                        {this.state.convocation.dependences.map((dependence)=>
                                            <li>{dependence.name}</li>
                                        )}

                                    </li>
                                    <li className="list-group-item">
                                        <label>Perfil:</label>

                                        {this.state.convocation.profiles.map((prof)=>
                                            <li>{prof.description}</li>
                                        )}

                                    </li>
                                    <li className="list-group-item">
                                        <label>Actividades a realizar:</label>

                                        {this.state.convocation.activities.map((activity)=>
                                            <li>{activity.description}</li>
                                        )}

                                    </li>
                                    <li className="list-group-item">
                                        <label>Archivos requeridos:</label>

                                        {this.state.convocation.required_files.map((required_file)=>
                                            <li>{required_file.name}</li>
                                        )}

                                    </li>
                                </ul>

                                <div className="col-md-12">
                                    <div className="row" style={{ textAlign:'center'}}>
                                        <div className="btn-group" >
                                            <button className="btn-default">Agregar Convocatoria</button>
                                            <button className="btn-default"><a href={`${Url}convocations/${this.state.convocation.id}.pdf`} target="_blank">Generar PDF</a></button>
                                            <button className="btn-default" onClick={this.handleOnClickAtras.bind(this)}>Atras</button>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

			
				)
			}else{return(<Forbbiden/>)}
			}
}
