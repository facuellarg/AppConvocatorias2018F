import React,{Component} from 'react'
import { render } from 'react-dom';
import './css/CrearConvocatoria.css'
import {Url} from "./Url";


export class CrearConvocatoria extends Component{
    constructor(props){
        super(props)
        this.state ={dependences:[]}
        this.handleOnClickRequest =  this.handleOnClickRequest.bind(this)
        this.handleOnClickDependence = this.handleOnClickDependence.bind(this)
        this.handleOnClickActivities = this.handleOnClickActivities.bind(this)
        this.handleOnClickFiles = this.handleOnClickFiles.bind(this)
        this.handleOnClickCrear = this.handleOnClickCrear.bind(this)
    }

    async componentWillMount(){

        /*if(!localStorage.getItem('token')){
            return;
        }*/

        const options ={
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }


        try{
            let response =  await fetch(Url+'/dependences', options);
            if(response.ok ){
                let jsonResponse = await response.json();
                this.setState({dependences:jsonResponse})
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


                this.setState({convocations:jsonResponse.convocations, currentPage: pageNumber})
                return
            }
            throw new Error("No se pudo obtener las convocatorias");
        }catch(error){
            alert(error.message)

        }

    }

    handleOnClickRequest(e){
        e.preventDefault();

        this.refs.request.innerHTML += '<input class="form-control" input="text" placeholder="Requisitos"/>'

    }
    handleOnClickActivities(e){
        e.preventDefault();

        this.refs.activities.innerHTML += '<input class="form-control" input="text" placeholder="Actividad"/>'
    }
    handleOnClickFiles(e){
        e.preventDefault();

        this.refs.files.innerHTML += ' <input class="form-control" input="text" placeholder="Nombre del Archivo"/>'
    }
    handleOnClickDependence(e){
        e.preventDefault();

        let a  = <select className="form-control">
                    {this.state.dependences.map((dependence, key)=>
                        <option value={dependence.id} key={key}>{dependence.name}</option>
                    )}
                </select>
        render( a,  this.refs.dependences)

    }
    handleOnClickCrear(){
        const name = this.refs.name.value;
        const level = this.refs.level.value;
        const vacants = this.refs.name.value;


    }
    render(){

        return(
            <div className="container-fluid">
                <form autoComplete="off">
                    <div className="col-md-4 margin" align="right">
                        <div className="input-group">
                            <span className="input-group-addon">Nombre</span>
                            <input ref="name" type="text" className="form-control"
                                   placeholder="Nombre de la Convocatoria"/>
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">Para estudiantes de :</span>
                            <select ref="selectLevel" className="form-control">
                                <option value="pregrado">Pregrado</option>
                                <option value="postgrado">Postgrado</option>

                            </select>
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">Vacantes</span>
                            <input ref="vacancies" min='0' type="number" className="form-control"
                                  />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">Disponibilidad Semanal</span>
                            <input ref="hours" min='0' type="number" className="form-control"
                            />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">Pago Mensual</span>
                            <input ref="hours" min='10000' type="number" className="form-control"
                            />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">Dias de vinculacion</span>
                            <input ref="hours" min='7' type="number" className="form-control"
                            />
                        </div>
                        <div className="form-group ">
                            <div className='input-group date' >
                                <span className="input-group-addon">
                                    <span className="glyphicon glyphicon-calendar"></span>
                                </span>
                                <input type='text' placeholder='DD/MM/AAAA' className="form-control"/>

                            </div>
                        </div>

                    </div>
                    <div align="left" className="col-md-4 ">
                        <div className="form-group">
                            <span className="input-group-addon">Descipcion de la convocatoria</span>
                            <textarea className="form-control" rows="5" id="comment"style={{resize:'none'}}></textarea>
                        </div>


                        <div className="form-group">
                            <span className="input-group-addon ">Dependencias</span>
                            <div className="form-group array" ref="dependences" >
                                <select className="form-control" multiple>
                                    {this.state.dependences.map((dependence, key)=>
                                        <option value={dependence.id} key={key}>{dependence.name}</option>
                                    )}
                                </select>
                            </div>
                            {/*<button className="btn btn-default glyphicon glyphicon-plus" onClick={this.handleOnClickDependence}></button>*/}
                        </div>
                        <div className="form-group">
                            <span className="input-group-addon ">El estudiante debe ser de:</span>
                            <div className="form-group array" ref="level" >
                                <select className="form-control">

                                    <option value={1}>Pregrado</option>
                                    <option value={2}>Postgrado</option>

                            </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <span className="input-group-addon ">Requisitos</span>
                            <div className="form-group array" ref="request" >
                                <input className="form-control" input="text" placeholder="Requisitos"/>
                            </div>
                            <button className="btn btn-default glyphicon glyphicon-plus" onClick={this.handleOnClickRequest}></button>
                        </div>

                        <div className="form-group">
                            <span className="input-group-addon ">Actividades</span>
                            <div className="form-group array" ref="activities" >
                                <input className="form-control" input="text" placeholder="Actividad"/>
                            </div>
                            <button className="btn btn-default glyphicon glyphicon-plus" onClick={this.handleOnClickActivities}></button>
                        </div>
                        <div className="form-group">
                            <span className="input-group-addon ">Archivos Requeridos</span>
                            <div className="form-group array" ref="files" >
                                <input className="form-control" input="text" placeholder="Nombre del Archivo"/>
                            </div>
                            <button className="btn btn-default glyphicon glyphicon-plus" onClick={this.handleOnClickFiles}></button>
                        </div>
                    </div>
                    <div className="row" align="center">
                        <div className="col-md-12"><button className="btn btn-default" onClick={this.handleOnClickCrear}>Crear Convocatoria</button></div>

                    </div>
                </form>
            </div>

        )
    }
}