import React,{Component} from 'react';

import{Header} from './Header.js';
import {Footer} from './Footer.js'
import {Content} from './Content'
import items from './menu.js';
import store from './store.js'
import PropTypes from 'prop-types';
import {obtenerDatos} from './obtenerDatos.js'


import './css/convocatoria.css'
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
		this.state = {  s_users: {}}
	}

	async componentWillMount(){

     if (localStorage.getItem('token')) {
      let user =  (obtenerDatos(localStorage.getItem('token')));
      let a;
      await user.then(function(value) {
        a = value

      });

      this.setState({ s_users: a})

    
    }
  }
  static propTypes = {
    children: PropTypes.object.isRequired
  };
    async updateRedux(){
       const body ={
                     type: "ADD_TO_STORE",
                     id: this.state.s_users.id,
                     name: this.state.s_users.name,
                     lastname: this.state.s_users.lastname,
                     level: this.state.s_users.level,
                     email: this.state.s_users.email,
                     dependence_id: this.state.s_users.dependence_id,

           
                 }
         if(localStorage.getItem('token')){
            await store.dispatch(body)}
        }

	render(){

    this.updateRedux()
    const { children } = this.props;
    console.log("HOla")
			
    return (
     
        <body>
        	<Header items={items} />
          <main> <Content body={children} /></main>
	        <Footer />	
        </body>
      
    );

	}
}
