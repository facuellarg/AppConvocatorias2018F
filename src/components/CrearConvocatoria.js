import React,{Component} from 'react'
import './css/CrearConvocatoria.css'
import store from './store'
import {Url} from "./Url";
import swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'
let Activities=[]
let Requeriments=[]
let Profiles=[]
let Required_Files=[]
export class CrearConvocatoria extends Component{
    constructor(props){
        super(props)
        this.state ={dependences:[], inputRequest:[], inputActivities:[], inputFiles:[], inputProfiles:[]}
        this.handleOnClickRequest =  this.handleOnClickRequest.bind(this)
        this.handleOnClickActivities = this.handleOnClickActivities.bind(this)
        this.handleOnClickFiles = this.handleOnClickFiles.bind(this)
        this.handleOnClickCrear = this.handleOnClickCrear.bind(this)
        this.onChangeActivites = this.onChangeActivites.bind(this)
        this.onChangeRequest = this.onChangeRequest.bind(this)
        this.onChangeFiles = this.onChangeFiles.bind(this)
        this.onChangeProfiles = this.onChangeProfiles.bind(this)

    }

    async componentWillMount(){

        if(!localStorage.getItem('Admintoken')){
            return;
        }
        this.state.inputProfiles.push(<input id={0}className="form-control" input="text"onChange={this.onChangeProfiles} placeholder="Perfil"/>)
        this.state.inputRequest.push(<input id={0}className="form-control" input="text"onChange={this.onChangeRequest} placeholder="Requisitos"/>)
        this.state.inputActivities.push( <input id={0} className="form-control" input="text" onChange={this.onChangeActivites}  placeholder="Actividad"/>)
        this.state.inputFiles.push(<input id={0} className="form-control" input="text" onChange={this.onChangeFiles}placeholder="Nombre del Archivo 1"/>)
        const options ={
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem('Admintoken'),
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
        let re =/^([3][0-1]|[0-2][0-9]|[0-9])[/]([1][0-2]|[0-9]|[0][0-9])[/][0-9]{4}$/;
        return re.test(data)
    }
    onChangeActivites(e){
        const input = e.target
        Activities[input.id] = input.value

    }
    onChangeRequest(e){
        const input = e.target
        Requeriments[input.id] = input.value

    }
    onChangeFiles(e){
        const input = e.target
        Required_Files[input.id] = input.value

    }
    onChangeProfiles(e){
        const input = e.target
        Profiles[input.id] = input.value
    }

    handleOnClickRequest(e){
        e.preventDefault();
        const l = this.state.inputRequest.length
        if(l == 3){
            return;
        }
        const a = <input id={l} className="form-control" input="text" onChange={this.onChangeRequest}placeholder="Requisitos" autoFocus/>
        let temp = this.state.inputRequest;
        temp.push(a);
        this.setState({inputRequest:temp})


    }
    handleOnClickActivities(e){
        e.preventDefault();
        const l = this.state.inputActivities.length
        if(l == 3){
            return;
        }
        const input = <input id={l} className="form-control" input="text" onChange={this.onChangeActivites} placeholder="Actividad" autoFocus/>

        let temp = this.state.inputActivities;
        temp.push(input);
        this.setState({inputActivities:temp})
    }
    handleOnClickFiles(e){
        e.preventDefault();
        let l = this.state.inputFiles.length
        if(l == 10){
            return;
        }

        const placeholder ="Nombre del Archivo " + (l+1)
        const a = <input id={l} className="form-control" input="text" onChange={this.onChangeFiles} placeholder={placeholder} autoFocus/>
        let temp = this.state.inputFiles;
        temp.push(a);
        this.setState({inputFiles:temp})
    }

    parseDescription(array){
        let out_obj = {}
        array.forEach((attr,index)=>{
            out_obj[String(index)] = {
                description: attr
            }
        })
        console.log("entro " + array)
        console.log("salio " + out_obj)
        return out_obj
    }
    parseName(array){
        let out_obj = {}
        array.forEach((attr,index)=>{
            out_obj[String(index)] = {
                name: attr
            }
        })
        return out_obj
    }

    parseDependences(array){
        let out_obj = {}
        array.forEach((attr,index)=>{
            out_obj[String(index)] = {
                dependence_id: attr
            }
        })
        return out_obj
    }

    handleOnClickCrear(e) {
        e.preventDefault();
        const end_date = this.refs.endDate.value;
        if (!this.validateData(end_date)) {
            swal({
                type: 'error',
                title: 'Fecha Incorrecta',
                text: 'La Fecha debe estar en formato DD/MM/AAAA',

            })
            return;
        }

        let a = store.getState();
        const admin = {
            name: a.name,
            lastname: a.lastname,
            phone_ext: a.phone_ext
        };
        let dependences = []
        var x = this.refs.dependences;
        for (let i = 0; i < x.length; i++) {
            if (x.options[i].selected == true) {
                dependences.push(x.options[i].value)
            }
        }
        const description = this.refs.description.value;
        const duration = this.refs.days.value;

        const hours_per_week = this.refs.hours.value;
        const level = this.refs.selectLevel.value;
        const name = this.refs.name.value;
        const payout = this.refs.payout.value;
        const vacants = this.refs.vacancies.value;

        const body = JSON.stringify({
            admin,
            activities_attributes: this.parseDescription(Activities),
            convocation_dependences_attributes:this.parseDependences(dependences),
            description,
            duration,
            end_date,
            hours_per_week,
            level,
            name,
            payout,
            profiles_attributes: this.parseDescription(Profiles),
            requeriments_attributes: this.parseDescription(Requeriments),
            required_files_attributes: this.parseName(Required_Files),
            vacants

        })

        console.log(body)
        const options = {
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem('Admintoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body
        }

        fetch(`${Url}/convocations`, options).then((response)=>{
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then(jsonResponse=>{
            swal({
                type:'success',
                title:'Conovocatoria creada exitosamente'
            })

        }).catch(error=>{
            swal({
                type:'error',
                title:'Error al crear convocatoria',
                text: error.message
            })
        })

    }







    render(){
        if(!localStorage.getItem('Admintoken')){
            return <Redirect to="/" />
        }
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
                    </div>
                    <div className="col-md-4">
                        <div className="form-group" >
                            <span className="input-group-addon">
                                <button className="btn btn-default glyphicon glyphicon-plus" onClick={this.handleOnClickRequest}></button>
                                Requisitos
                            </span>
                            <div className="form-group array" id="request" >
                                {this.state.inputRequest}
                            </div>

                        </div>

                        <div className="form-group">
                            <span className="input-group-addon ">
                                <button className="btn btn-default glyphicon glyphicon-plus" onClick={this.handleOnClickActivities}></button>
                                Actividades
                            </span>
                            <div className="form-group array" ref="activities" >
                                {this.state.inputActivities}
                            </div>

                        </div>
                        <div className="form-group">
                            <span className="input-group-addon ">
                                <button className="btn btn-default glyphicon glyphicon-plus" onClick={this.handleOnClickFiles}></button>
                                Archivos Requeridos
                            </span>
                            <div className="form-group array" ref="files" >
                                {this.state.inputFiles}
                            </div>

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