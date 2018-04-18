import React, {Component} from 'react';
import {Url} from './Url.js'
import {obtenerDatos} from './obtenerDatos.js'
import { Link } from 'react-router-dom'

export class LoginForm extends Component{
	constructor(props){
		super(props);
		this.state={isLogged:0};

		this.handleOnSubmitLogin = this.handleOnSubmitLogin.bind(this);

		}

  	

	async handleOnSubmitLogin(e){
		

		
		e.preventDefault();

		const email = this.refs.email.value;
		const password = this.refs.password.value;
		const data = JSON.stringify(
			{
				"auth":{"email":email,"password":password}
			}
			)
		
		const options={
			method: 'POST',
			headers: {
	        'Accept': 'application/json',
          'Content-Type': 'application/json',
	       },
	       body: data,
		}
		


		try{
			let response = await fetch(Url+'/user_token', options);
			
			if(response.ok){
				let jsonResponse = await response.json();
				let n = await obtenerDatos(jsonResponse.jwt)
				await localStorage.setItem('token', jsonResponse.jwt);
				this.props.onChange(1);
				//console.log(jsonResponse);
				alert(`Bienvenido ${n.name}`)
				
				// console.log(response.jwt);
				setTimeout(function(){document.location.reload()},1000);

				return
			}
			throw new Error("Error en el usuario o contraseña");
		}catch(error){
			alert(error.message)

		}
	      
	}
	render(){
		return(
			<form style={{textAlign: 'center'}} id='formularioSesion' onSubmit={this.handleOnSubmitLogin}>
					<input className="inputInicio" ref="email" type="text" name="correoInstitucional" placeholder="Correo institucional" /><br/>				
					<input className="inputInicio" ref="password" type="password" name="contraseña" placeholder="Ingrese su contraseña" /><br/>
				<input id="submitIniciarSesion" type="submit" value="Iniciar sesion"/><br/>
				<Link to="/recordarContraseña"> ¿Haz olvidado tu Contraseña? </Link>
			</form>
			)
	}

}