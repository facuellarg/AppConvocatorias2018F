import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SignOut extends Component{
	constructor(){
		super();
		this.onClickCerrarSesion = this.onClickCerrarSesion.bind(this)
	}
onClickCerrarSesion(){
		localStorage.clear();
		setTimeout(function(){document.location.reload()},1000);
	}
	

	render(){
		if (localStorage.getItem('token')){
			return(<li><Link  onClick={this.onClickCerrarSesion}to="/">Cerrar Sesion</Link></li>)
		}else{return(<li><Link to="/">Inicio Sesion</Link></li>)
	}
		
		 
	}
}
	