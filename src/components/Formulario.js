import React, {Component} from 'react';
import {LoginForm} from './LoginForm.js'
import {RegistForm} from './RegistForm.js'
import {obtenerDatos} from './obtenerDatos.js'
import {Profile} from './Profile.js'


export class Formulario extends Component{
	constructor(props){
		super(props);
		this.state={login:1, isLogged: 0, s_users: []};
		this.handlerOnclickLogin = this.handlerOnclickLogin.bind(this);
		this.handlerOnclickRegistro = this.handlerOnclickRegistro.bind(this);
		this.changeLogged = this.changeLogged.bind(this);
		// this.handleOnSubmitLogin = this.handleOnSubmitLogin.bind(this);
		
		// this.handleOnSubmitRegistro = this.handleOnSubmitRegistro.bind(this);
		}

		componentWillMount(){

			if (localStorage.getItem('token')) {
      obtenerDatos(localStorage.getItem('token')).then((users) => {
        this.setState({ s_users: users })
        this.setState({isLogged:1})
        console.log(this.state.isLogged)
	      })

	    }else{this.setState({isLogged:0})}
			console.log(this.state.isLogged)

		}
	
	handlerOnclickLogin(){
		document.getElementById('botonIniciarSesion').setAttribute("class", "btn btn-info");
		document.getElementById('botonRegistro').setAttribute("class", "btn btn-default");
		this.setState({
			login:1
		})
	}

	handlerOnclickRegistro(){
		document.getElementById('botonRegistro').setAttribute("class", "btn btn-info");
		document.getElementById('botonIniciarSesion').setAttribute("class", "btn btn-default");
		this.setState({
			login:0
		})
	}

	changeLogged(Logged) {
    this.setState({
      isLogged: Logged
    });
	}
		
	render(){
		console.log(this.state.isLogged)
		if (this.state.isLogged === 0){
			let a = this.state.login === 1 ? <LoginForm onChange={this.changeLogged}/> : <RegistForm/>
			return(
				<div style={{textAlign: 'center'}} >
					<div className="btn-group" style={{width: '100'}}>
						<button id="botonIniciarSesion" type="button" onClick={this.handlerOnclickLogin} className="btn btn-info" style={{width: '50'}} >Iniciar sesion</button>
						<button id="botonRegistro" type="button" className="btn btn-default" onClick={this.handlerOnclickRegistro}  style={{width: '50'}}>Registrarse</button><br/>
					</div><br/>
					{a}
				</div>
			)
		}else{
			return(
				<div className="container-fluid">
					<Profile />
				</div>
			)
		}		
	};



}