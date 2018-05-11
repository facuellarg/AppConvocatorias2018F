import React,{Component} from 'react'
import './css/CrearConvocatoria.css'
import ReactDOM from 'react-dom'

import {Url} from "./Url";
import swal from 'sweetalert2'

export class CrearConvocatoria extends Component{
    constructor(props){
        super(props)
        this.state ={dependences:[], inputRequest:[], inputActivities:[], inputFiles:[]}
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
        this.state.inputRequest.push(<input className="form-control" input="text" placeholder="Requisitos"/>)
        this.state.inputActivities.push( <input className="form-control" input="text" placeholder="Actividad"/>)
        this.state.inputFiles.push(<input className="form-control" input="text" placeholder="Nombre del Archivo 1"/>)
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

    
    validateData(data){
        let re =/^[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}$/;
        return re.test(data)
    }
    handleOnClickRequest(e){
        e.preventDefault();
        if(this.state.inputRequest.length == 3){
            return;
        }
        const a = <input className="form-control" input="text" placeholder="Requisitos"/>
        let temp = this.state.inputRequest;
        temp.push(a);
        this.setState({inputRequest:temp})


    }
    handleOnClickActivities(e){
        e.preventDefault();
        if(this.state.inputActivities.length == 3){
            return;
        }
        const a = <input className="form-control" input="text" placeholder="Actividad"/>
        let temp = this.state.inputActivities;
        temp.push(a);
        this.setState({inputActivities:temp})
    }
    handleOnClickFiles(e){
        e.preventDefault();
        let n = this.state.inputFiles.length
        if(n== 10){
            return;
        }
        n = n+1
        const placeholder ="Nombre del Archivo " + n
        const a = <input className="form-control" input="text" placeholder={placeholder}/>
        let temp = this.state.inputFiles;
        temp.push(a);
        this.setState({inputFiles:temp})
    }
    handleOnClickDependence(e){
        e.preventDefault();
        /*
        let a  = <select className="form-control">
                    {this.state.dependences.map((dependence, key)=>
                        <option value={dependence.id} key={key}>{dependence.name}</option>
                    )}
                </select>
        render( a,  this.refs.dependences)*/

    }
    handleOnClickCrear(e){
        e.preventDefault()
        const name = this.refs.name.value;
        const description = this.refs.description.value;
        const level = this.refs.level.value;
        const end_date = this.refs.endDate.value;
        const vacants = this.refs.name.value;
        const hoursPeerWeek = this.refs.hours.value;
        const payout = this.refs.payout.value;
        const vincultaions_days = this.refs.days.value;
        let dependences =[]

        var x = this.refs.dependences;
        for(let i = 0; i < x.length; i ++){
            if(x.options[i].selected == true){
                dependences.push(x.options[i].text)
            }
        }
        if(!this.validateData(end_date)){
            swal({
                type: 'error',
                title: 'Fecha Incorrecta',
                text: 'La Fecha debe estar en formato DD/MM/AAAA',

            })
            //return;
        }









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
                            <input ref="payout" min='10000' type="number" className="form-control"
                            />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">Dias de vinculacion</span>
                            <input ref="days" min='7' type="number" className="form-control"
                            />
                        </div>
                        <div className="form-group ">
                            <div className='input-group date' >
                                <span className="input-group-addon">
                                    <span className="glyphicon glyphicon-calendar"></span>
                                </span>
                                <input ref="endDate" type='text'  placeholder='DD/MM/AAAA' className="form-control"/>

                            </div>
                        </div>

                    </div>
                    <div align="left" className="col-md-4 ">
                        <div className="form-group">
                            <span className="input-group-addon">Descipcion de la convocatoria</span>
                            <textarea ref="description"className="form-control" rows="5" id="comment" style={{resize:'none'}}></textarea>
                        </div>


                        <div className="form-group">
                            <span className="input-group-addon ">Dependencias</span>
                            <div className="form-group array"  >
                                <select ref="dependences" className="form-control" multiple>
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
                        <div className="form-group" >
                            <span className="input-group-addon"><button className="btn btn-default glyphicon glyphicon-plus" onClick={this.handleOnClickRequest}></button>Requisitos</span>
                            <div className="form-group array" id="request" >
                                {this.state.inputRequest}
                            </div>

                        </div>

                        <div className="form-group">
                            <span className="input-group-addon ">Actividades</span>
                            <div className="form-group array" ref="activities" >
                                {this.state.inputActivities}
                            </div>
                            <button className="btn btn-default glyphicon glyphicon-plus" onClick={this.handleOnClickActivities}></button>
                        </div>
                        <div className="form-group">
                            <span className="input-group-addon ">Archivos Requeridos</span>
                            <div className="form-group array" ref="files" >
                                {this.state.inputFiles}
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