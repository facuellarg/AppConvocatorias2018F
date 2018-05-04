import React, {Component} from 'react';
import {Url} from './Url.js'
import {obtenerDatos} from './obtenerDatos.js'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";


export class LoginForm extends Component{
	  static contextTypes = {
    router: PropTypes.object
	  }
	  constructor(props, context) {
		 super(props, context);
		this.state={isLogged:0, data:null};
		this.handleOnSubmitLogin = this.handleOnSubmitLogin.bind(this);
	  }

  validateEmail(email) {
    var re = /[a-zA-Z]+@+unal.edu.co/;
    return re.test(email);
}

	async handleOnSubmitLogin(e){

		e.preventDefault();

        const email = this.refs.email.value.toLowerCase();
        const password = this.refs.password.value;
        var data = {};
        var link = "";

        if(this.refs.checkBoxAdmin.checked){
             data = JSON.stringify({
                    "auth":{ email}
                })
             link = "/admin_token";


        }else{
            data = JSON.stringify({
                    "auth":{"email":email,"password":password}
                })
            link = "/user_token";

        }
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



		/*fetch(Url+link, options).then(response=>{
				if(response.ok){
						return response.json()
					}
					throw new Error("Error en el usuario o contraseña")
				},
					error => alert(error.code)
					).then(jsonResponse=>{
						let n = obtenerDatos(jsonResponse.jwt)
						console.log(n.name)
						localStorage.setItem('token', jsonResponse.jwt);
						this.context.router.history.push("/CuentaUser")
                        window.location.reload()
								})*/
        try{
            let response = await fetch(`${Url}${link}`, options);

            if(response.ok){
                let jsonResponse = await response.json();
                let n = await obtenerDatos(jsonResponse.jwt)
                localStorage.setItem('token', jsonResponse.jwt);



                return;
            }
        throw new Error("No se pudo cargar los datos, error de usuario o contraseña")
        } catch (e) {
            alert(e.message)
        }
        
        if(localStorage.getItem('token')){
            this.context.router.history.push("/CuentaUser")
            window.location.reload();
        }


				
			
				//console.log(jsonResponse);
				// alert(`Bienvenido ${n.name}`)
				
				// if(localStorage.getItem('token')){
    //     store.dispatch({
    //              type: "ADD_TO_STORE",
    //              id: n.id,
    //              name: n.name,
    //              lastname: n.lastname,
    //              level: n.level,
    //              email: n.email,
    //              dependence_id: n.dependence_id,
    //              PAPA: n.PAPA,
    //              PBM: n.PBM,
    //          })
       //  console.log(this.state.s_users)
       // }

       
				
				// console.log(response.jwt);
				

				
		// 	}
		// 	throw new Error("Error en el usuario o contraseña");
		// }catch(error){
		// 	alert(error.message)

		// }
	      
	}
	render(){
		
		return(
			<div className="col-md-4 col-md-offset-4" align="center">
				<form style={{textAlign: 'center'}} id='formularioSesion' onSubmit={this.handleOnSubmitLogin}>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
                        <input ref="email" type="text" className="form-control" name="email" placeholder="Correo Institucional"/>

                    </div>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
                        <input ref="password" type="password" className="form-control" name="password" placeholder="Contraseña"/>

                    </div>
					{/*<input ref="email" type="text" name="correoInstitucional" placeholder="Correo institucional" /><br/>
						<input className="inputInicio" ref="password" type="password" name="contraseña" placeholder="Ingrese su contraseña" /><br/>*/}



                    <div className="input-group">
						<span className="input-group-addon" data-toggle="tooltip" data-placement="bottom" title="Iniciar Como Admin">
							<input type="checkbox" ref="checkBoxAdmin"aria-label="Checkbox for following text input" />
						</span>
                        <input className="btn btn-success width" type="submit" value="Iniciar sesion"/><br/>

                    </div>



					<Link to="/recordarContraseña"> ¿Haz olvidado tu Contraseña? </Link>

				</form>
            </div>
			)
	}

}