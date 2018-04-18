import React, {Component} from 'react';
import {Url} from './Url.js'


export class RegistForm extends Component{
	constructor(props){
		super(props);
		this.state={isLogged:0};
		
		this.handleOnSubmitRegistro = this.handleOnSubmitRegistro.bind(this);
		}


async handleOnSubmitRegistro(e){

		e.preventDefault();
		const name = this.refs.nameR.value;
		const lastname = this.refs.lastNameR.value;
		const email = this.refs.emailR.value;
		const password = this.refs.passwordR.value;
		const confPassword = this.refs.confPassword.value;
		const dependence_id = this.refs.dependence;

		if(password !== confPassword){
			alert("las contraseñas no coinciden");
			return;
		}

		const options={
      method: 'POST',
	    headers: {
	        'Accept': 'application/json',
           'Content-Type': 'application/json',
	       },
	    body: JSON.stringify({
	    		 "name": name,
	    		 "lastname": lastname,
	         "email": email,
	         "password": password,
	         "password_confirmation": password,
	         "dependence_id": dependence_id,
	
	      	}) 
      
		}
		try{
			let response = await fetch(`${Url}/users`, options);
			let jsonResponse = await response.json();
			if(response.ok){
				alert("Registro Completo ya puedes iniciar sesion")
				return
			}
			throw new Error(jsonResponse.email + jsonResponse.password);
		}catch(error){
			console.log(error.message)

		}
	}

	render(){
		return(
			<form style={{textAlign: 'center'}} onSubmit={this.handleOnSubmitRegistro}>
				<input className="inputna" type="text" ref="nameR"  placeholder="Nombres" />
				<input className="inputna" type="text" ref="lastNameR" placeholder="Apellidos" /><br/>
				<input className="inputRegistro" type="text" ref="emailR" placeholder="Correo institucional" /><br/>
				<input className="inputRegistro" type="number" ref="dependence" placeholder="Codigo de la Carrera" /><br/>
				<input className="inputRegistro" type="password" ref="passwordR" placeholder="Contraseña" /><br/>
				<input className="inputRegistro" type="password" ref="confPassword" placeholder="Confirmar Contraseña" /><br/>

				<input className="inputRegistro" type="submit" value="Registrarse"/>
			</form>

			)
	}
}