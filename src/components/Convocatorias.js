import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {convocatoriaStore} from './convocatoriaStore.js'
import {Url} from './Url.js'
import './css/Convocatorias.css'
import Pagination from "react-js-pagination";

export class Convocatorias extends Component{
	constructor(){
		super()
		this.state={currentPage :1, pages :20, itemsPeerPage:7, convocations:[]}
	}
	async componentWillMount(){
		const data = ({"pages" : 4,
				        "convocations" : [{"id":1,
										                "name":"name",
										                "level":"pregrado",
										                "description":"description",
										                "type":"type",
										                "end_date":"end_date",
										                "admin":{
										                    "name":"nameAdmin",
										                    "email":"emailAdmin",
										                    "phone":"phoneAdmin"
										                },
										                "vacants":0,
										                "hours_per_week":10,
										                "payout" : 5,
										                "duration" : 1,
										                "requeriments":[
										                    {"description":"requeriment1"},
										                    {"description":"requeriment2"},
				                						],
										                "dependences":[
										                    {"name":"dependence1"},
										                    {"name":"dependence2"},
				                						],
				                						"profile":[
										                    {"description":"profile1"},
										                    {"description":"profile2"},
				                						],
				                						"activities":[
										                    {"description":"activity1"},
										                    {"description":"activity2"},
				                						],
				                						"required_files":[
										                    {"name":"required_file1"},
										                    {"name":"required_file2"},
				                						],

				             						 },{"id":2,
										                "name":"name2",
										                "level":"pregrado",
										                "description":"description2",
										                "type":"type2",
										                "end_date":"end_date2",
										                "admin":{
										                    "name":"nameAdmin2",
										                    "email":"emailAdmin2",
										                    "phone":"phoneAdmin2"
										                },
										                "vacants":0,
										                "hours_per_week":10,
										                "payout" : 5,
										                "duration" : 1,
										                "requeriments":[
										                    {"description":"requeriment3"},
										                    {"description":"requeriment4"},
				                						],
										                "dependences":[
										                    {"name":"dependence3"},
										                    {"name":"dependence4"},
				                						],
				                						"profile":[
										                    {"description":"profile3"},
										                    {"description":"profile4"},
				                						],
				                						"activities":[
										                    {"description":"activity3"},
										                    {"description":"activity4"},
				                						],
				                						"required_files":[
										                    {"name":"required_file3"},
										                    {"name":"required_file4"},
				                						],

				             						 }]
				            
				          })
		await this.setState({convocations: data})
		
		console.log((this.state.convocations));
}
	

	// async componentWillMount(){

	// 	const data = JSON.stringify(
	// 		{
	// 			page:1
	// 		}
	// 		)
		
	// 	const options={
	// 		method: 'GET',
	// 		headers: {
	//         'Accept': 'application/json',
 //          'Content-Type': 'application/json',
	//        },
	//        body: data,
	// 	}
		


	// 	try{
	// 		let response = await fetch(Url+'/convocatorias', options);
			
	// 		if(response.ok){
	// 			let jsonResponse = await response.json();
	// 			this.setState({pages:jsonResponse.pages, convocations:jsonResponse.convocations})
	// 			return
	// 		}
	// 		throw new Error("No se pudo obtener las convocatorias");
	// 	}catch(error){
	// 		alert(error.message)

	// 	}
	// }
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
    console.log(`active page is ${pageNumber}`);
    this.setState({currentPage: pageNumber});
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
			<div className="col-md-3">
			<fieldset style={{marginTop:30}}>
			<legend>Filtros</legend>
			
			

			
			<div className="input-group">
			
				<span class="input-group-addon" >
					<input type="radio" />
				</span>
				<select  className="form-control" ref="levelF" >
					<option>Pregrado</option>
					<option>Postgrado</option>
				</select>

			</div>

			<button>Filtrar</button>
	
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
					{this.state.convocations.convocations.map(
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
			<div className="row" >
			<div className="col-md-3">
				</div>
				<div className="col-md-4" style={{align:'left'}}>
				{pagination} 
				</div>
				<div className="col-md-4">
				
				</div>
			</div>
			</div>
		)
	}


}