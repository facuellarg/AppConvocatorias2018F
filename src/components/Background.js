import React,{Component} from 'react';
import {Formulario} from './Formulario.js';
import{Header} from './Header.js';
import {Footer} from './Footer.js'
import {Content} from './Content'
import items from './menu.js';
import store from './store';
import {obtenerDatos} from './obtenerDatos.js'


import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css' ;
import './css/reset.css' ;
import './css/unal.css' ;
import './css/base.css';
import './css/tablet.css' ;
import './css/phone.css' ;
import './css/small.css' ;
import './css/formulario.css' ;
/*
import './css/printer.css' ;
import "./js/jquery.js" ;
import "./js/unal.js" ;

*/


import sealColombia from './images/sealColombia.png';
import escudoUnal from './images/escudoUnal.png';
import escudoUnalSvg from './images/escudoUnal.svg';
import escudoUnal_black from './images/escudoUnal_black.png';




export class Background extends Component{
	constructor(props){
		super(props);
		this.state = {  s_users: []}
	}

	componentWillMount(){
     if (localStorage.getItem('token')) {
      obtenerDatos(localStorage.getItem('token')).then((users) => {
        this.setState({ s_users: users })
      })
    }
  }


	render(){
		if (localStorage.getItem('Token')) {
    store.dispatch({
         type: "ADD_TO_STORE",
         id: this.state.s_users.id,
         name: this.state.s_users.name,
         email: this.state.s_users.email,
         PAPA: this.state.s_users.PAPA,
         PBM: this.state.s_users.PBM,
     })}
			const { children } = this.props;
    return (
     
        <div>
        	<Header items={items} />
	        <Content body={children} />
	        <Footer />	
        </div>
      
    );

	}
}
