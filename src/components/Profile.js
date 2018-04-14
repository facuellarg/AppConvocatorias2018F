import React,{Component} from 'react'

export class Profile extends Component{

	render(){
		return(
			<div className="col-md-6" style={{textAlign: 'center'}}>
				<div className="row">
					<label>Nombre</label><input type="text" ref="name"></input>
				</div>
				<div className="row">
					<label>Nombre</label><input className="editable" type="text" ref="name"></input>
				</div>
				<div className="row">
					<label>PAPA</label><input className="editable" type="text" ref="PAPA"></input><label>PBM</label><input className="text" type="text" ref="PBM"></input>
				</div>
				<div className="row">
					<button className="btn btn-default">Actualizar</button>
					<button className="btn btn-default">Guardar</button>
				</div>

			</div>
			)
	}
}