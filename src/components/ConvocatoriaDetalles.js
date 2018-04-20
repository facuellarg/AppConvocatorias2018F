import React,{Component} from 'react';
import convocatoriaStore from './convocatoriaStore'
import store from './store.js'
import {Url} from './Url.js'
import PropTypes from "prop-types";
import {Forbbiden} from './Forbbiden'

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
		this.context.router.history.push("/MiCuenta")
	}

	render(){
			if(localStorage.getItem('token')){
				return(
			<div>
				<div className="col-md-6" style={{ textAlign:'right'}}>
				<section>
				<h3>Nombre de la conovocatoria:{`${this.state.convocation.name}`}</h3>
				</section>
				<section>
				<h3>Descripcion de la conovocatoria: {`${this.state.convocation.description}`}</h3>
				</section>
				<section>
				<h3>Para estudiantes de: {`${this.state.convocation.level}`}</h3>
				</section>
				<section>
				<h3>Finaliza el: {`${this.state.convocation.end_date}`}</h3>
				</section>
				<section>
				<h3>Responsable de la Convocatoria: {`${this.state.convocation.admin.name}`}</h3>
				</section>
				<section>
				<h3>Vacantes: {`${this.state.convocation.vacants}`}</h3>
				</section>
				<section>
				<h3>Disponibilidad de tiempo requerida: {`${this.state.convocation.hours_per_week}`}</h3>
				</section>
				<section>
				<h3> Estímulo económico mensual: $ {`${this.state.convocation.payout}`}</h3>
				</section>
				<section>
				<h3>Duración de la vinculación: {`${this.state.convocation.vacants}`}</h3>
				</section>
				</div>
				<div className="col-md-6">
				<section>
				<h3>Requisitos Generales:</h3>
				
					{this.state.convocation.requirements.map((requeriment)=>
						<li>{requeriment.description}</li>
						)}
		
				</section>
				<section>
				<h3>Dependencias:</h3>
			
					{this.state.convocation.dependences.map((dependence)=>
						<li>{dependence.name}</li>
						)}
				
				</section>
				<section>
				<h3>Perfil:</h3>
			
					{this.state.convocation.profiles.map((prof)=>
						<li>{prof.description}</li>
						)}
				
				</section>
				<section>
				<h3>Actividades a realizar:</h3>
			
					{this.state.convocation.activities.map((activity)=>
						<li>{activity.description}</li>
						)}
				
				</section>
				<section>
				<h3>Archivos requeridos:</h3>
			
					{this.state.convocation.required_files.map((required_file)=>
						<li>{required_file.name}</li>
						)}
				
				</section>
				</div>
				<div className="col-md-12">
				<div className="row" style={{ textAlign:'center'}}>
					<div className="btn-group" >
						<button className="btn-default">Agregar Convocatoria</button>
						<button className="btn-default"><a href={`${Url}convocations/${this.state.convocation.id}.pdf`} target="_blank">Generar PDF</a></button>
						<button className="btn-default" onClick="{this.handleOnClickAtras.bind(this)}">Atras</button>

					</div>
				</div>
				</div>

			</div>
			
				)
			}else{return(<Forbbiden/>)}
			}
}
