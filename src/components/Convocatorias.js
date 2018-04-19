import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {convocatoriaStore} from './convocatoriaStore.js'
import {Url} from './Url.js'

import Pagination from "react-js-pagination";
import {Form} from 'react-bootstrap/lib'

import {FormGroup} from 'react-bootstrap/lib'
import {Button} from 'react-bootstrap/lib'
import {ControlLabel} from 'react-bootstrap/lib'
import './css/convocatoria.css'
export class Convocatorias extends Component{
	constructor(){
		super()
		this.state={currentPage :1, pages :20, itemsPeerPage:7, convocations:[], data:{}, base:{}}
	}
	// async componentWillMount(){
	// 	this.setState({base:{"level":"",
	// 				  							"dependence":"",
	// 				  							"minPAPA":0,
	// 				  							"maxPAPA":5,
	// 				  							"minPBM":0,
	// 				  							"maxPBM":1000,
	// 				  							"minPayout":100000,
	// 				  							"maxPayout":10000000},
	// 				  				data:{"level":"",
	// 				  							"dependence":"",
	// 				  							"minPAPA":0,
	// 				  							"maxPAPA":5,
	// 				  							"minPBM":0,
	// 				  							"maxPBM":1000,
	// 				  							"minPayout":0,
	// 				  							"maxPayout":10000000}	});

	// 	const datas = ({"pages" : 4,
	// 			        "convocations" : [{"id":1,
	// 									                "name":"name",
	// 									                "level":"pregrado",
	// 									                "description":"description",
	// 									                "type":"type",
	// 									                "end_date":"end_date",
	// 									                "admin":{
	// 									                    "name":"nameAdmin",
	// 									                    "email":"emailAdmin",
	// 									                    "phone":"phoneAdmin"
	// 									                },
	// 									                "vacants":0,
	// 									                "hours_per_week":10,
	// 									                "payout" : 5,
	// 									                "duration" : 1,
	// 									                "requeriments":[
	// 									                    {"description":"requeriment1"},
	// 									                    {"description":"requeriment2"},
	// 			                						],
	// 									                "dependences":[
	// 									                    {"name":"dependence1"},
	// 									                    {"name":"dependence2"},
	// 			                						],
	// 			                						"profile":[
	// 									                    {"description":"profile1"},
	// 									                    {"description":"profile2"},
	// 			                						],
	// 			                						"activities":[
	// 									                    {"description":"activity1"},
	// 									                    {"description":"activity2"},
	// 			                						],
	// 			                						"required_files":[
	// 									                    {"name":"required_file1"},
	// 									                    {"name":"required_file2"},
	// 			                						],

	// 			             						 },{"id":2,
	// 									                "name":"name2",
	// 									                "level":"pregrado",
	// 									                "description":"description2",
	// 									                "type":"type2",
	// 									                "end_date":"end_date2",
	// 									                "admin":{
	// 									                    "name":"nameAdmin2",
	// 									                    "email":"emailAdmin2",
	// 									                    "phone":"phoneAdmin2"
	// 									                },
	// 									                "vacants":0,
	// 									                "hours_per_week":10,
	// 									                "payout" : 5,
	// 									                "duration" : 1,
	// 									                "requeriments":[
	// 									                    {"description":"requeriment3"},
	// 									                    {"description":"requeriment4"},
	// 			                						],
	// 									                "dependences":[
	// 									                    {"name":"dependence3"},
	// 									                    {"name":"dependence4"},
	// 			                						],
	// 			                						"profile":[
	// 									                    {"description":"profile3"},
	// 									                    {"description":"profile4"},
	// 			                						],
	// 			                						"activities":[
	// 									                    {"description":"activity3"},
	// 									                    {"description":"activity4"},
	// 			                						],
	// 			                						"required_files":[
	// 									                    {"name":"required_file3"},
	// 									                    {"name":"required_file4"},
	// 			                						],

	// 			             						 }]
				            
	// 			          })
// 		await this.setState({convocations: datas})
		
// 		console.log((this.state.convocations));
// }
	

	async componentWillMount(){

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
				this.setState({convocations:jsonResponse})
				console.log(this.state.convocations)
				return
			}
			throw new Error("No se pudo obtener las convocatorias");
		}catch(error){
			alert(error.message)

		}
	}
	handleOnClickVerDetalles(e){
		const convocation = this.state.convocations.convocations[e.target.id]
		alert(e.target.id);
		convocatoriaStore.dispatch({
        type: "ADD_TO_STORE",
        id: convocation.id,
        name: convocation.name,
        description: convocation.description,
        level: convocation.level,
        end_date: convocation.end_date,
        admin: convocation.admin,
        vacants: convocation.vacants,
        hours_per_week: convocation.hours_per_week,
        payout: convocation.payout,
        duration: convocation.PBM,
        requeriments: Array.from(convocation.requeriments),
        dependences: Array.from(convocation.dependences),
        profile: Array.from(convocation.profile),
        activities: Array.from(convocation.activities),
        required_files: Array.from(convocation.required_files),
     })
	}
	handlePageChange(pageNumber) {
  //   const data = JSON.stringify(
		// 	{
		// 		page:pageNumber
		// 	}
		// 	)
		
		// const options={
		// 	method: 'GET',
		// 	headers: {
	 //        'Accept': 'application/json',
  //         'Content-Type': 'application/json',
	 //       },
	 //       body: data,
		// }
		


		// try{
		// 	let response = await fetch(Url+'/convocatorias', options);
			
		// 	if(response.ok){
		// 		let jsonResponse = await response.json();
		// 		this.setState({pages:jsonResponse.pages, convocations:jsonResponse.convocations})
		// 		return
		// 	}
		// 	throw new Error("No se pudo obtener las convocatorias");
		// }catch(error){
		// 	alert(error.message)

		// }
  this.setState({currentPage: pageNumber});
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
  	console.log((JSON.stringify(this.state.data)))
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
					{/*this.state.convocations.convocations.map(
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
		              		)*/}

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
	}


}