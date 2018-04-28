import React, {Component} from 'react';
import './css/cuenta.css';
import { Link } from 'react-router-dom';
import store from './store';
import {Url} from './Url';



export class MiCuenta extends Component{
constructor(props){
		super(props)
		this.state = {}

		this.onClickActualizar = this.onClickActualizar.bind(this);
		this.onClickGuardar = this.onClickGuardar.bind(this);
	}






onClickActualizar(){
	

		this.refs.selectDependence.removeAttribute('disabled');
		this.refs.selectLevel.removeAttribute('disabled');
		this.refs.name.removeAttribute("readOnly");
		this.refs.lastname.removeAttribute("readOnly");
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

		try{
			let response = await fetch(`${Url}/users/${store.getState().id}`, options);
			let jsonResponse = await response.json();
			console.log(jsonResponse);
			if(response.ok){
				alert("Datos Actualizados");
				this.refs.selectDependence.setAttribute('disabled','disabled');
				this.refs.selectLevel.setAttribute('disabled','disabled');
				this.refs.name.setAttribute("readOnly","readOnly");
				this.refs.lastname.setAttribute("readOnly","readOnly");
				return
			}
			throw new Error((jsonResponse));
			

		}catch(error){
			console.log(error)
		}
	}	

render() {
    console.log("Render")

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
                    	  <h4 id="correo" ref="email" className="s-property-title">{`${store.getState().email}`}</h4>
					<input className="input" id="inputName" ref="name" type="text" readOnly="readOnly" defaultValue={`${store.getState().name}`} ></input>
                       <input className="input" id="inputName" ref="lastname" type="text" readOnly="readOnly" defaultValue={`${store.getState().lastname}`}></input>
                    </div>
                   <label>Dependencia:</label>
	                    <select ref="selectDependence" disabled>
											{ this.props.dependences.map((dependence)=>
												<option value={dependence.id} >{dependence.name}</option>)}
													)}
						
											</select><br/>
											<label>Pregrado/Postgrado:</label>
											<select ref="selectLevel" disabled>
												<option value="pregrado">Pregrado</option>
												<option value="postgrado">Postgrado</option>
						
											</select><br/>
						{/*<input className="input"id="inputPapa"type="number" ref="PAPA" placeholder="Ingrese su PAPA" min="0" max="5" readOnly="readOnly"  defaultValue={`${store.getState().PAPA}`}></input><br/>
												<input  className="input"id="inputPbm" type="number" ref="PBM" placeholder = "Ingrese su PBM" min="0"  readOnly="readOnly" defaultValue={`${store.getState().PBM}`}></input><br/>*/}
						
						
					
						

					<div  className="btn-gruop">
					<button id ="botonGuardar" className="btn btn-default" onClick={this.onClickActualizar} >Modificar Datos</button>
					<button id ="botonCerrar" className="btn btn-default" onClick={this.onClickGuardar} ref="guardar" >Guardar Cambios</button>
						
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