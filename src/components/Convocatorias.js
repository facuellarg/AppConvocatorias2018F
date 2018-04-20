import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {ConvocatoriaDetalles} from './ConvocatoriaDetalles.js'
import convocatoriaStore from './convocatoriaStore.js'
import {Url} from './Url.js'
import {Forbbiden} from './Forbbiden'

import Pagination from "react-js-pagination";
import {Form} from 'react-bootstrap/lib'

import {FormGroup} from 'react-bootstrap/lib'
import {Button} from 'react-bootstrap/lib'
import {ControlLabel} from 'react-bootstrap/lib'
import './css/convocatoria.css'
export class Convocatorias extends Component{
	constructor(){
		super()
		this.state={currentPage :1, pages :0, itemsPeerPage:10, convocations:[], verdetalle:0}
	}

	

	 async componentWillMount(){

		if(!localStorage.getItem('token')){
			 return;
		}
		const data1 = JSON.stringify(
			{
				page:1
			}
			)
		
		const options={
			method: 'POST',
			headers: {
					"Authorization": localStorage.getItem('token'),
	        'Accept': 'application/json',
          'Content-Type': 'application/json',
	       },
	       body: data1,
		}
		


		try{
			let response = await fetch(Url+'/search_convocations', options);
			
			if(response.ok){
				let jsonResponse = await response.json();

				this.setState({pages:jsonResponse.pages,convocations:jsonResponse.convocations})
				console.log(jsonResponse);
				return
			}
			throw new Error("No se pudo obtener las convocatorias");
		}catch(error){
			alert(error.message)

		}
	}
	async handleOnClickVerDetalles(e){

		const convocation = this.state.convocations[e.target.id]
		 localStorage.setItem('convocation', JSON.stringify(convocation))

	}
	async handlePageChange(pageNumber) {
    const data = JSON.stringify(
			{
				page:pageNumber
			}
			)
		
		const options={
			method: 'POST',
			headers: {
					"Authorization": localStorage.getItem('token'),
	        'Accept': 'application/json',
          'Content-Type': 'application/json',
	       },
	       body: data,
		}
		


		try{
			let response = await fetch(Url+'/search_convocations', options);
			
			if(response.ok){
				let jsonResponse = await response.json();
				console.log(jsonResponse)

				this.setState({convocations:jsonResponse.convocations, currentPage: pageNumber})
				return
			}
			throw new Error("No se pudo obtener las convocatorias");
		}catch(error){
			alert(error.message)

		}

  }
  handleOnChangeLevel(){
  		
  	if (this.refs.levelFilter.checked){ 
  		this.refs.selectLevel.removeAttribute('disabled');
  		return}
  		this.refs.selectLevel.setAttribute('disabled', true);
  	// if (this.refs.levelFilter.checked){
  	// 	this.state.data.level= this.refs.selectLevel.options[this.refs.selectLevel.selectedIndex].text
  	// }else{this.state.data.level = this.state.base.level}
  	
  }
  handleOnChangeDependence(){
  	if (this.refs.dependenceFilter.checked){ 
  		this.refs.selectDependence.removeAttribute('disabled');
  		return}
  		this.refs.selectDependence.setAttribute('disabled', true);
  	// if (this.refs.dependenceFilter.checked){ 
  	// 	this.state.data.dependence= this.refs.selectDependence.options[this.refs.selectDependence.selectedIndex].text
  	// }else{this.state.data.dependence = this.state.base.level}
  	
  }
  handleOnChangePAPA(){
  	if (this.refs.PAPAFilter.checked){ 
  		this.refs.minPAPA.removeAttribute('disabled');
  		this.refs.maxPAPA.removeAttribute('disabled');
  		return
  	}
  	this.refs.minPAPA.setAttribute('disabled', true);
  	this.refs.maxPAPA.setAttribute('disabled', true);
  }
  // 	if (this.refs.PAPAFilter.checked){ 
  // 		this.state.data.minPAPA= this.refs.minPAPA.value;
  // 		this.state.data.maxPAPA= this.refs.maxPAPA.value;
  // 	}else{this.state.data.minPAPA= this.state.base.minPAPA;
  // 				this.state.data.maxPAPA= this.state.base.maxPAPA;}
  // }
  handleOnChangePBM(){
  	if (this.refs.PBMFilter.checked){ 
  		this.refs.minPBM.removeAttribute('disabled');
  		this.refs.maxPBM.removeAttribute('disabled');
  		return
  	}
  	this.refs.minPBM.setAttribute('disabled', true);
  	this.refs.maxPBM.setAttribute('disabled', true);
  }
  // 	if (this.refs.PBMFilter.checked){ 
  // 		this.state.data.minPBM= this.refs.minPBM.value;
  // 		this.state.data.maxPBM= this.refs.maxPBM.value;
  // 	}else{this.state.data.minPBM= this.state.base.minPBM;
  // 				this.state.data.maxPBM= this.state.base.maxPBM;}
  // }
  handleOnChangePayout(){
  	if (this.refs.payoutFilter.checked){ 
  		this.refs.minPayout.removeAttribute('disabled');
  		this.refs.maxPayout.removeAttribute('disabled');
  		return
  	}
  	this.refs.minPayout.setAttribute('disabled', true);
  	this.refs.maxPayout.setAttribute('disabled', true);
  }
  // 	if (this.refs.payoutFilter.checked){ 
  // 		this.state.data.minPayout= this.refs.minPayout.value;
  // 		this.state.data.maxPayout= this.refs.maxPayout.value;
  // 	}else{this.state.data.minPayout= this.state.base.minPayout;
  // 				this.state.data.maxPayout= this.state.base.maxPayout;}
  	
  	
  // }
  handleOnClickFiltrar(){
  	if (this.refs.levelFilter.checked){
  		this.state.data.level= this.refs.selectLevel.options[this.refs.selectLevel.selectedIndex].text
  	}else{this.state.data.level = this.state.base.level}

    if (this.refs.dependenceFilter.checked){ 
  		this.state.data.dependence= this.refs.selectDependence.options[this.refs.selectDependence.selectedIndex].text
  	}else{this.state.data.dependence = this.state.base.level}

  	if (this.refs.PAPAFilter.checked){ 
	  		this.state.data.minPAPA= this.refs.minPAPA.value;
	  		this.state.data.maxPAPA= this.refs.maxPAPA.value;
	  	}else{this.state.data.minPAPA= this.state.base.minPAPA;
	  				this.state.data.maxPAPA= this.state.base.maxPAPA;}
	  
	  	if (this.refs.PBMFilter.checked){ 
	  		this.state.data.minPBM= this.refs.minPBM.value;
	  		this.state.data.maxPBM= this.refs.maxPBM.value;
	  	}else{this.state.data.minPBM= this.state.base.minPBM;
	  				this.state.data.maxPBM= this.state.base.maxPBM;}
	  
	  	if (this.refs.payoutFilter.checked){ 
	  		this.state.data.minPayout= this.refs.minPayout.value;
	  		this.state.data.maxPayout= this.refs.maxPayout.value;
	  	}else{this.state.data.minPayout= this.state.base.minPayout;
	  				this.state.data.maxPayout= this.state.base.maxPayout;}
  	
  }

	render(){
		
  

		let pagination =( <div>
        <Pagination
          activePage={this.state.currentPage}
          itemsCountPerPage={this.state.itemsPeerPage}
          totalItemsCount={this.state.itemsPeerPage*this.state.pages}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
          
        />
      </div>
);
		if(localStorage.getItem('token')){
			return(
				<div className="container-fluid">
				<main>
				<div className="col-md-3">
				<fieldset style={{marginTop:30}}>
				<legend>Filtros</legend>
			
						{/*<label >filtro por dependencia: </label><input type="checkBox" />

					<select  className="form-control" ref="levelF" 'disabled' >
						<option>Pregrado</option>
						<option>Postgrado</option>
					</select>


				<button>Filtrar</button>*/}
				<Form inline >
				  <FormGroup >
				  	<input type="checkBox"  className="checkbox" ref="levelFilter" onChange={this.handleOnChangeLevel.bind(this)}inline></input>
				    <select  className="form-control" ref="selectLevel" disabled>
							<option>Pregrado</option>
						<option>Postgrado</option>

					</select>
				  </FormGroup>
				  <br/>
				  <FormGroup >
				  	<input type="checkBox" className="checkbox" ref="dependenceFilter" onChange={this.handleOnChangeDependence.bind(this)}inline></input>
				    <select  className="form-control" ref="selectDependence" disabled>

						<option>Pregrado</option>
						<option>Postgrado</option>
					</select>
				  </FormGroup>
				  <br/>
				  
				  <FormGroup >

				  	
				  	<input type="checkBox" className="checkbox" ref="PAPAFilter" onChange={this.handleOnChangePAPA.bind(this)}inline></input>
				  	<ControlLabel inline>PAPA</ControlLabel>{' '}
				    <input  ref="minPAPA"type="number" defaultValue={3} min="3.0" max="5.0" disabled/>--
						<input  ref="maxPAPA"type="number" defaultValue={5} min="3.0" max="5.0" disabled/>
						<br/>
										
				  </FormGroup>
				   <FormGroup >
				  	<input type="checkBox" className="checkbox" ref="PBMFilter" onChange={this.handleOnChangePBM.bind(this)}inline></input>
				  	 <ControlLabel>PBM</ControlLabel>{' '}
					    <input  ref="minPBM"type="number" defaultValue={1} min="1.0" max="100.0" disabled/>--
							<input  ref="maxPBM"type="number" defaultValue={100} min="1.0" max="100.0" disabled/>
						<br/>
				  </FormGroup>
				  <FormGroup >
				  	<input type="checkBox"  className="checkbox" ref="payoutFilter" onChange={this.handleOnChangePayout.bind(this)}inline></input>
				  	 <ControlLabel>Mensualidad</ControlLabel>{' '}
					    <input  ref="minPayout" type="number"defaultValue={100000} min="100000" max="10000000" disabled/>--
							<input  ref="maxPayout" type="number" defaultValue={10000000}min="100000" max="10000000" disabled/>
						
				  </FormGroup>
				 
				  <Button onClick={this.handleOnClickFiltrar.bind(this)}>Filtrar</Button>

				</Form>
		
				</fieldset>
				</div>
				<div className="col-md-7">
				<table className="Tabla_Convocatorias">
					<thead>
						<tr>
							
				      <th className="header">Los convocados deben <br/> ser estudiantes de</th>
							<th className="header">Nombre del Proyecto</th>
							<th className="header">Dependencia</th><th className="header">Tipo</th>
							<th className="header">Fecha de cierre de convocatoria</th>
							<th className="header">PDF</th>
						</tr>
					</thead>
					<tbody>
						{this.state.convocations.map(
			                (conovocation,index) => <tr  key={conovocation.id}>
			                <td >{conovocation.level}</td>
			                <td >{conovocation.name}</td>
			                 <td >
			                 	<ul>
			                 		{conovocation.dependences.map((dependence) =>
			                 			<li>{dependence.name}</li>)}
			                 	</ul>
			                 </td>
			                 <td>{conovocation.type}</td>
			                 <td>{conovocation.end_date}</td>
			                 <td ><Link id={index} onClick={this.handleOnClickVerDetalles.bind(this)}to="/verdetalles">Ver detalles</Link></td>
			                 </tr>
			              		)}

					</tbody>
				</table>
				</div>
				{	//	<div className="col-md-2"></div>
			}	
				</main>
				<div className="row" style={{align:'center'}} >
				<div className="col-md-4">
					</div>
					<div className="col-md-4" style={{align:'center'}}>
					{pagination} 
					</div>
					<div className="col-md-4">
					
					</div>
				</div>
				</div>
		)
			                 	}else{return(<Forbbiden/>)}
	}


}