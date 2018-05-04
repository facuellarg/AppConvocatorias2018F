import React, {Component} from 'react';
import {LoginForm} from './LoginForm.js'
import {RegistForm} from './RegistForm.js'
import {obtenerDatos} from './obtenerDatos.js'
import PropTypes from "prop-types";
import firebase from 'firebase';
import {Url} from './Url'



export class Formulario extends Component{
	static contextTypes = {
    router: PropTypes.object
	  }
	  constructor(props, context) {
     super(props, context);
		this.state={login:1, isRegisted: 0, s_users:[]};
		this.handlerOnclickLogin = this.handlerOnclickLogin.bind(this);
		this.handlerOnclickRegistro = this.handlerOnclickRegistro.bind(this);
		this.changeRegisted = this.changeRegisted.bind(this);
		this.handleOnClickWithGoogle = this.handleOnClickWithGoogle.bind(this);
		this.hanledSignOut = this.hanledSignOut.bind(this)
		// this.handleOnSubmitLogin = this.handleOnSubmitLogin.bind(this);
		
		// this.handleOnSubmitRegistro = this.handleOnSubmitRegistro.bind(this);
		}

		componentWillMount(){

			if (localStorage.getItem('token')) {
			  obtenerDatos(localStorage.getItem('token')).then((users) => {
				this.context.router.history.push("/CuentaUser")
     
	      })

	    }else{this.setState({isLogged:0})}


		}
	
	handlerOnclickLogin(){
		document.getElementById('botonIniciarSesion').setAttribute("class", "btn btn-success");
		document.getElementById('botonRegistro').setAttribute("class", "btn btn-default");
		this.setState({
			login:1
		})
	}

	handlerOnclickRegistro(){
		document.getElementById('botonRegistro').setAttribute("class", "btn btn-success");
		document.getElementById('botonIniciarSesion').setAttribute("class", "btn btn-default");
		this.setState({
			login:0
		})
	}
    async handleOnClickWithGoogle(){

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
			.then(result => {
                console.log(result)
                var re = /[a-zA-Z]+@+unal.edu.co/;
                if(re.test(result.user.email)){
                   const data ={email: result.additionalUserInfo.profile.email,
				   				given_name : result.additionalUserInfo.profile.given_name,
				   				family_name: result.additionalUserInfo.profile.family_name,
				   				dependence_id:1}
				   	console.log(data)
                    const options={
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    }


					fetch(`${Url}/users/social`,options).then( response =>{
						if(response.ok){
							return response.json()
						}
						throw new Error("No se pudo iniciar sesion");
					},error => console.log(Error.message)).
						then(jsonResponse =>{
							localStorage.setItem('token',jsonResponse.jwt)


						})


                    return;
				}else{
					alert("Correo no institucional")
                    firebase.auth().signOut()
                        .then(()=>{
                            this.setState({s_users :null})

                            return;
                        })
                        .catch(error => console.log(error.message))
				}


			})
			.catch(error => alert(error.message + "  " + error.code))

	}
	hanledSignOut(){


		firebase.auth().signOut()
			.then(()=>{
                this.setState({s_users :null})

				return;
			})
			.catch(error => console.log(error.message))
	}

	changeRegisted(Logged) {
		this.refs.login.click();
	}
		
	render(){
		console.log(this.state.s_users)
		
		
					let a = this.state.login === 1 || this.state.isRegisted === 1 ? <LoginForm /> : <RegistForm onChange={this.changeRegisted}/>
			return(
				<div align="center" >
                    <div className="col-md-4 col-md-offset-4">
                        <button className="btn btn-block btn-social btn-google google" onClick={this.handleOnClickWithGoogle}>
                            <span className="fa fa-google"></span> Inicia sesion con tu correo institucional
                        </button>
						{/*<button className="btn btn-block btn-social btn-google " onClick={this.hanledSignOut}>
                            <span className="fa fa-twitter"></span> salir por ahora
                        </button>*/}
					<div className="col-md-12">
                        <h4 className="word-with-line"><span className="word"> Ò </span></h4>
					</div>
                    </div>
					<div className="col-md-12" align="center">
                        <div className="btn-group " >
                            <button id="botonIniciarSesion" ref="login"type="button" onClick={this.handlerOnclickLogin} className="btn btn-success" style={{width: '50'}} >Iniciar sesion</button>
                            <button id="botonRegistro" type="button" className="btn btn-default" onClick={this.handlerOnclickRegistro}  style={{width: '50'}}>Registrarse</button><br/>
                        </div><br/>
                        {a}
					</div>
				</div>
			)

		
	};



}