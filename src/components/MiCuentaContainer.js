import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import {MiCuenta} from './MiCuenta'
import {Delay} from "./Delay";
import './css/cuenta.css';


import {Url} from './Url';
import {Forbbiden} from './Forbbiden'



export class MiCuentaContainer extends Component{
constructor(){
		super()
		this.state = {email:null, dependences:[], data:null, user:{}}
		
	}


	async componentWillMount(){
		if(!localStorage.getItem('token')){
			return;
		}

	// !(store.getState().name === undefined)
	// await this.setState({dependences:dependences})
	// peticion para tener todas las dependencias
			const options ={
		    method: 'GET',
		    headers: {
		        'Accept': 'application/json',
	          'Content-Type': 'application/json',
		       }
			}
        fetch(Url+'/dependences', options).then(response =>
        {
            if(response.ok){
                return response.json();
            }
            throw new Error('No se pudieron cargar las dependencias')
        },error => alert(error.message)).then(jsonResponse =>{
            this.setState({dependences:jsonResponse})
        })
	/*try{
		let response =  await fetch(Url+'/dependences', options).then(response =>
        {
            if(response.ok){
                return response.json();
            }
            throw new Error('No se pudieron cargar las dependencias')
        },error => alert(error.message)).then(jsonResponse =>{
            this.setState({dependences:jsonResponse})
        })
		let jsonResponse = response.json();
		if(response.ok){
			let a;
			await jsonResponse.then(function(value) {
				   a = value;

				});

			await this.setState({dependences:a})
			return;
	}
	
	/throw new Error('No se pudieron cargar las dependencias')
	}catch(error){
		console.log(error.message)
	}	*/


}
componentDidMount(){
	if(!localStorage.getItem('token')){
			return;
	}
	// this.setState({
	// 	user: store.getState()
	// })
	// console.log(JSON.stringify(this.state.user))
	
}

// field(){
// 	this.refs.selectDependence.value = store.getState().dependence_id;
// 	this.refs.email.innerHTML = `Correo: ${this.state.email}`;
// 	this.refs.selectLevel.value = store.getState().level 
// 	this.refs.name.value = store.getState().name
// 	this.refs.lastname.value = store.getState().lastname 
// }
// setField(){
// 	while(true){

// 	}

// }


/* onClickActualizar(){
	
		
		this.refs.selectDependence.removeAttribute('disabled');
		this.refs.selectLevel.removeAttribute('disabled');
		this.refs.name.removeAttribute("readonly");
		this.refs.lastname.removeAttribute("readonly");
		this.refs.selectDependence.focus();
	}

	async onClickGuardar(){
		const name = this.refs.name.value;
		const lastname = this.refs.lastname.value;
		const email = this.state.email;
		const dependence_id = this.refs.selectDependence.value;
		const level = this.refs.selectLevel.value;
		
		
		const options={
      method: 'PUT',
	    headers: {
	    		"Authorization": localStorage.getItem('token'),
	        'Accept': 'application/json',
          'Content-Type': 'application/json',
	       },
	    body: JSON.stringify({
	    		 "name": name,
	    		 "lastname": lastname,
	    		 "level" : level,
	         "email": email,
	         "dependence_id":dependence_id ,
	      	})

		}
		console.log(options.body);
		try{
			let response = await fetch(`${Url}/users/${store.getState().id}`, options);
			let jsonResponse = await response.json();
			console.log(jsonResponse);
			if(response.ok){
				alert("Datos Actualizados");
				this.refs.selectDependence.setAttribute('disabled','disabled');
				this.refs.selectLevel.setAttribute('disabled','disabled');
				this.refs.name.setAttribute("readonly","readonly");
				this.refs.lastname.setAttribute("readonly","readonly");
				return
			}
			throw new Error((jsonResponse));
			

		}catch(error){
			console.log(error)
		}
	}	*/

render() {


	


		/*if((store.getState().name === undefined)){


		 	return(<ReactLoading type='spin' height={500} width={300} />)
		 }*/
    if(localStorage.getItem('token') ){
     	return(
            <Delay wait={500}> <MiCuenta  dependences={this.state.dependences} user={this.state.user}/></Delay>
      );
     }else{return(<Forbbiden/>)}
    }

}