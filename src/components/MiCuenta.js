import React, {Component} from 'react';
import FileUpload from './FileUpload.js';
import './css/cuenta.css';


export class MiCuenta extends Component{
constructor(){
	super();
	this.state = {
	terms: false,
	papa: "",
	pbm : "",
	codigo: "",
	name: "Brayan",
	email: "brayan@unal.edu.co"
	}
	this.updateTerms= this.updateTerms.bind(this)
	this.acepTerms=this.acepTerms.bind(this)
	this.updatePapa=this.updatePapa.bind(this)
	this.updatePbm=this.updatePbm.bind(this)
	this.updateCodigo=this.updateCodigo.bind(this)
	
}
updatePapa(e){
	this.setState({
		papa: e.target.value
	})

}
updatePbm(e){
	this.setState({
		pbm: e.target.value
	})

}
updateCodigo(e){
	this.setState({
		codigo: e.target.value
	})

}
updateTerms(e){ //Listo para usar para guardar, con un if==true.
	this.setState({
		terms: e.target.checked

});
}

acepTerms(){
	if(this.state.terms){
		console.log('Datos modificados');
		console.log(this.state.papa);
		console.log(this.state.pbm);
		console.log(this.state.codigo);
	}else{
		alert("Debe aceptar los terminos para continuar");

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
                      	<h4 id="foto" style={{textAlign: 'left'}}>Agregar Foto </h4>
                        <FileUpload />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 padding-profile">
                    <div className="caja">
                      <h4 id ="nombre"className="s-property-title" >Nombre: {this.state.name}</h4>
                     
                  
                       <h4 id="correo" className="s-property-title">Correo: {this.state.email}</h4>
                    </div>
                   
	                    
						<input id="inputPapa"type="number" ref="PAPA" placeholder="Ingrese su PAPA" value={this.state.papa} onChange={this.updatePapa}></input><br/>
						<input  id="inputPbm" type="number" ref="PBM" placeholder = "Ingrese su PBM" value ={this.state.pbm} onChange={this.updatePbm}></input><br/>
						<input id="inputCodigo" type="number" ref="CODIGO" placeholder = "Ingrese su Codigo" value={this.state.codigo} onChange={this.updateCodigo}></input><br/>
						
					
					<div style={{textAlign:'center'}}>
	                   <label>
						<input id ="checkbox"type="checkbox" checked={this.state.terms} onClick={this.updateTerms}  />Acepto los Terminos
					   </label>	
					</div>		

					<div  className="btn-gruop">
						<button id ="botonGuardar" type="submit" className="btn btn-default" onClick={this.acepTerms}>Guardar cambios</button>
						<button id ="botonCerrar" type="submit" className="btn btn-default">Cerrar sesión</button>
				   	</div>  	
                  </div>  
                </div>
                <br />
            </div>
          </div>
        </div>
      </div>
    </div>  
      
      );
    }

}