import React,{Component} from 'react';
import store from './store';
import {Url} from './Url'
 

export class Profile extends Component{
	constructor(){
		super()
		this.onClickActualizar = this.onClickActualizar.bind(this);
		this.onClickGuardar = this.onClickGuardar.bind(this);
	}



	onClickActualizar(){
		
		this.refs.PAPA.removeAttribute("readonly");
		this.refs.PBM.removeAttribute("readonly");
		this.refs.PAPA.focus();
	}

	async onClickGuardar(){
		const name = this.refs.name.value;
		const email = this.refs.email.value;
		const PAPA = this.refs.PAPA.value;
		const PBM = this.refs.PBM.value;
		if (PAPA > 5 ){
			alert("El PAPA debe estar entre 0 y 5");
			this.refs.PAPA.focus()

			return

		}
		const options={
      method: 'PUT',
	    headers: {
	    		"Authorization": localStorage.getItem('token'),
	        'Accept': 'application/json',
           'Content-Type': 'application/json',
	       },
	    body: JSON.stringify({
	    		 "name": name,
	         "email": email,
	         "PAPA": PAPA,
	         "PBM": PBM,
	      	})

		}
		try{
			let response = await fetch(`${Url}/users/${store.getState().id}`, options);
			let jsonResponse = await response.json();
			if(response.ok){
				alert("Datos Actualizados");
			
				document.location.reload()
				return
			}
			throw new Error(jsonResponse.email + jsonResponse.password);
		}catch(error){
			console.log(error.message)
		}
	}	

	render(){
		return(
			<div className="col-md-6" style={{textAlign: 'right'}}>
				<div className="row">
					<label>Nombre: </label><input type="text" ref="name" value={`${store.getState().name}`}>{}</input>
				</div>
				<div className="row">
					<label>Corrreo Institucional: </label><input  type="text" defaultValue={`${store.getState().email}`}  ref="email" readonly="readonly"></input>
				</div>
				<div className="row">
					<label>PAPA</label><input type="number" min="0" max="5" readonly="readonly"  defaultValue={`${store.getState().PAPA}`} ref="PAPA"></input>
					<label>PBM</label><input type="number" min="0"  readonly="readonly" defaultValue={`${store.getState().PBM}`}ref="PBM"></input>
				</div>
				<div className="row">
					<button className="btn btn-default" onClick={this.onClickActualizar} >Actualizar</button>
					<button className="btn btn-default" onClick={this.onClickGuardar} ref="guardar" >Guardar</button>
				</div>

			</div>
			)
	}
}