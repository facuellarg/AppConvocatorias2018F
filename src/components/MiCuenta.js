import React, {Component} from 'react';

import './css/cuenta.css';
import { Link } from 'react-router-dom';
import store from './store';
import {Url} from './Url'


export class MiCuenta extends Component{
constructor(){
		super()
		this.state = {email: store.getState().email }
		this.onClickActualizar = this.onClickActualizar.bind(this);
		this.onClickGuardar = this.onClickGuardar.bind(this);
	}



onClickActualizar(){
		
		this.refs.PAPA.removeAttribute("readonly");
		this.refs.PBM.removeAttribute("readonly");
		this.refs.name.removeAttribute("readonly");
		this.refs.PAPA.focus();
	}

	async onClickGuardar(){
		const name = this.refs.name.value;
		const email = this.state;
		const PAPA = this.refs.PAPA.value;
		const PBM = this.refs.PBM.value;
		if (PAPA > 5 ){
			alert("El PAPA debe estar entre 0 y 5");
			this.refs.PAPA.focus()

			return

		}
		const options={
      method: 'PUT',
	    headers: {
	    		"Authorization": localStorage.getItem('token'),
	        'Accept': 'application/json',
           'Content-Type': 'application/json',
	       },
	    body: JSON.stringify({
	    		 "name": name,
	         "email": email,
	         "PAPA": PAPA,
	         "PBM": PBM,
	      	})

		}
		try{
			let response = await fetch(`${Url}/users/${store.getState().id}`, options);
			let jsonResponse = await response.json();
			if(response.ok){
				alert("Datos Actualizados");
			
				document.location.reload()
				return
			}
			throw new Error(jsonResponse.email + jsonResponse.password);
		}catch(error){
			console.log(error.message)
		}
	}	

render() {
     return(
    <div style={{ marginTop: `${50}px`, marginBottom: `${60}px`}}>
      <h1 className="page-title" id="miCuenta" style={{textAlign: 'center'}}>Mi cuenta</h1> 

      <div className="content-area user-profiel">&nbsp;
        <div className="container">   
          <div className="row">
            <div className="col-sm-12 col-sm-offset-1 profiel-container">
                <div className="profiel-header">
                 
            
                </div>
                <div className="clear">
                  <div className="col-sm-4 col-sm-offset-1">
                    <div className="container-fluid">
                      <div className="picture">
                      	
                      	<Link to="/misdocumentos">Subir Mis Documentos</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 padding-profile">
                    <div className="caja">
                    	 <h4 id="correo" className="s-property-title">Correo: {this.state.email}</h4>
                       <input id="inputName" ref="name" type="text" readonly="readonly" defaultValue={`${store.getState().name}`} ></input>
                     
                  
                      
                    </div>
                   
	                    
						<input id="inputPapa"type="number" ref="PAPA" placeholder="Ingrese su PAPA" min="0" max="5" readonly="readonly"  defaultValue={`${store.getState().PAPA}`}></input><br/>
						<input  id="inputPbm" type="number" ref="PBM" placeholder = "Ingrese su PBM" min="0"  readonly="readonly" defaultValue={`${store.getState().PBM}`}></input><br/>
						
						
					
						

					<div  className="btn-gruop">
					<button id ="botonGuardar" className="btn btn-default" onClick={this.onClickActualizar} >Actualizar</button>
					<button id ="botonCerrar" className="btn btn-default" onClick={this.onClickGuardar} ref="guardar" >Guardar</button>
						
				   	</div>  	
                  </div>  
                </div>
         
            </div>
          </div>
        </div>
      </div>
    </div>  
      
      );
    }

}