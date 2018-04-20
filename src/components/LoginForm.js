import React, {Component} from 'react';
import {Url} from './Url.js'
import {obtenerDatos} from './obtenerDatos.js'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import store from './store';


export class LoginForm extends Component{
	  static contextTypes = {
    router: PropTypes.object
	  }
	  constructor(props, context) {
     super(props, context);
		this.state={isLogged:0};

		this.handleOnSubmitLogin = this.handleOnSubmitLogin.bind(this);

		}

  validateEmail(email) {
    var re = /[a-zA-Z]+@+unal.edu.co/;
    return re.test(email);
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
		

		if(!this.validateEmail(email)){
			alert("el correo debe ser un correo de la universidad nacional (example@unal.edu.co)")
			return;
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
				
				if(localStorage.getItem('token')){
        store.dispatch({
                 type: "ADD_TO_STORE",
                 id: n.id,
                 name: n.name,
                 lastname: n.lastname,
                 level: n.level,
                 email: n.email,
                 dependence_id: n.dependence_id,
                 PAPA: n.PAPA,
                 PBM: n.PBM,
             })
        console.log(this.state.s_users)
       }


				this.context.router.history.push("/MiCuenta")
				// console.log(response.jwt);
				

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
				<Link ref="micuenta" to="/MiCuenta"></Link>
			</form>
			)
	}

}