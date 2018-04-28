import React, {Component} from 'react';
import {Url} from './Url.js'
// import dependences from './js/dependences.js'


export class RegistForm extends Component{
	constructor(props){
		super(props);
		this.state={isLogged:0, dependences:[], err:""};
		
		this.handleOnSubmitRegistro = this.handleOnSubmitRegistro.bind(this);
		}

async componentWillMount(){
	// await this.setState({dependences:dependences})
	// peticion para tener todas las dependencias
			const options ={
				method: 'GET',
		    headers: {
		        'Accept': 'application/json',
	          'Content-Type': 'application/json',
		       }
			}
	try{
		let response =  await fetch(Url+'/dependences', options);
		let jsonResponse = response.json();
		if(response.ok){
			let a;
			await jsonResponse.then(function(value) {
				   a = value;

				});

			await this.setState({dependences:a})
			return;
		}
	
	throw new Error('No se pudieron cargar las dependencias')
	}catch(error){
		console.log(error.message)
	}	


}
validateNombres(nombres) {
    var re = /[A-Za-z]+/;
    return re.test(nombres) ;
}
 pattern=""
validateEmail(email) {
    var re = /[a-zA-Z]/;
    return re.test(email);
}

async handleOnSubmitRegistro(e){

		e.preventDefault();

		const name = this.refs.nameR.value;
		const lastname = this.refs.lastNameR.value;
		const email =`${this.refs.emailR.value.toLowerCase()}@unal.edu.co` ;
		const password = this.refs.passwordR.value;
		const confPassword = this.refs.confPassword.value;
		const dependence_id =  this.refs.selectDependence.value;
		const level = this.refs.selectLevel.value;
		if(!(this.validateNombres(name) && this.validateNombres(lastname))){
			alert("los nombres y apellidos deben estar separados por un espacio y solo con letras(example example)")
			return;
		}
		if(!this.validateEmail(email)){
			alert("el correo debe ser un correo de la universidad nacional (example@unal.edu.co)")
			return;
		}
		console.log(dependence_id);
		if(password.length === 0 || password.length < 8){
			alert("La contraseña no puede ser vacia y minimo 8 caracteres")
			return
		}
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
	         "level": level,
	         "dependence_id": dependence_id,
	
	      	}) 
      
		}
		console.log(options.body)
		try{
			let response = await fetch(`${Url}/users`, options);
			let jsonResponse = await response.json();
			console.log(jsonResponse)
			if(response.ok){
				alert("Registro Completo ya puedes iniciar sesion")
				this.props.onChange();
				return;
			}
			throw new Error(jsonResponse.email + jsonResponse.password);
		}catch(error){
			console.log(error.message)
			alert("Registro no completo, Intentar mas tarde")

		}
	}

	render(){
		console.log(this.state.dependences)
		return(
			<div className="col-md-4 col-md-offset-4">
                <form style={{textAlign: 'center'}} onSubmit={this.handleOnSubmitRegistro}>
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
                        <input className="form-control" type="text" ref="nameR"  placeholder="Nombres" title="el nombre solo debe contener letras" />
                        <input className="form-control" type="text" ref="lastNameR" placeholder="Apellidos" title="el apellido solo debe contener letras" />
                    </div>

                    <div className="input-group">
                        <input className="form-control" type="text" ref="emailR" placeholder="Correo institucional"  title="debe ser un correo de la universidad nacional"/>
                        <span className="input-group-addon" >@unal.edu.co </span>
                    </div>




                    <select  className="form-control" ref="selectDependence">
                        { this.state.dependences.map((dependence)=>
                            <option value={dependence.id} >{dependence.name}</option>)}
                        )}

                    </select>
                    <select  className="form-control" ref="selectLevel" >
                        <option value="pregrado" selected>Pregrado</option>
                        <option value="postgrado">Postgrado</option>
                    </select>
                    <div className="input-group">
                        <span className="input-group-addon" ><i className="glyphicon glyphicon-lock"/> </span>
                        <input className="form-control" type="password" ref="passwordR" placeholder="Contraseña" />
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon" ><i className="glyphicon glyphicon-lock"/> </span>
                        <input className="form-control" type="password" ref="confPassword" placeholder="Confirmar Contraseña" />

					</div>


                    <input className="btn btn-success width" type="submit" value="Registrarse"/>
                </form>
			</div>

			)
	}
}