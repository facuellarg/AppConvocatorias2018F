import React,{Component} from 'react';
import {convocatoriaStore} from './convocatoriaStore.js'

export class ConvocatoriaDetalles extends Component{

	render(){

		return(
			<div>
				<div className="col-md-6" style={{ textAlign:'right'}}>
				<section>
				<h3>Nombre de la conovocatoria:{`${convocatoriaStore.getState().name}`}</h3>
				</section>
				<section>
				<h3>Descripcion de la conovocatoria: {`${convocatoriaStore.getState().description}`}</h3>
				</section>
				<section>
				<h3>Para estudiantes de: {`${convocatoriaStore.getState().level}`}</h3>
				</section>
				<section>
				<h3>Finaliza el: {`${convocatoriaStore.getState().end_date}`}</h3>
				</section>
				<section>
				<h3>Responsable de la Convocatoria: {`${convocatoriaStore.getState().admin.name}`}</h3>
				</section>
				<section>
				<h3>Vacantes: {`${convocatoriaStore.getState().vacants}`}</h3>
				</section>
				<section>
				<h3>Disponibilidad de tiempo requerida: {`${convocatoriaStore.getState().hours_per_week}`}</h3>
				</section>
				<section>
				<h3> Estímulo económico mensual: $ {`${convocatoriaStore.getState().payout}`}</h3>
				</section>
				<section>
				<h3>Duración de la vinculación: {`${convocatoriaStore.getState().vacants}`}</h3>
				</section>
				</div>
				<div className="col-md-6">
				<section>
				<h3>Requisitos Generales:</h3>
				
					{convocatoriaStore.getState().requeriments.map((requeriment)=>
						<li>{requeriment.description}</li>
						)}
		
				</section>
				<section>
				<h3>Dependencias:</h3>
			
					{convocatoriaStore.getState().dependences.map((dependence)=>
						<li>{dependence.name}</li>
						)}
				
				</section>
				<section>
				<h3>Perfil:</h3>
			
					{convocatoriaStore.getState().profile.map((prof)=>
						<li>{prof.description}</li>
						)}
				
				</section>
				<section>
				<h3>Actividades a realizar:</h3>
			
					{convocatoriaStore.getState().activities.map((activity)=>
						<li>{activity.description}</li>
						)}
				
				</section>
				<section>
				<h3>Archivos requeridos:</h3>
			
					{convocatoriaStore.getState().required_files.map((required_file)=>
						<li>{required_file.name}</li>
						)}
				
				</section>
				</div>
				<div className="col-md-12">
				<div className="row" style={{ textAlign:'center'}}>
					<div className="btn-group" >
						<button className="btn-default">Agregar Convocatoria</button>
						<button className="btn-default">Generar PDF</button>
					</div>
				</div>
				</div>

			</div>
			
				)
			}
}
