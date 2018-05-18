import React,{Component} from 'react';
import swal from 'sweetalert2';
import {Url} from './Url.js'
import PropTypes from "prop-types";
import {Forbbiden} from './Forbbiden'
import Modal from 'react-responsive-modal';

const options ={
    headers: {
        "Authorization": localStorage.getItem('Admintoken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

}
let a =  (<select id="posibilidad">
    <option value="aprobado">
        Aprobado
    </option >
    <option value="rechazado">
        Rechazado
    </option >
    <option value="interesado">
        Interesado
    </option >
</select>)
export class DetallesAspirantes extends Component{
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {convocation:[], approved:[],rejected:[],interested:[], open: false, currentUser:{}, files:[]}
        this.handleOnCLicVerDocumentosAproved = this.handleOnCLicVerDocumentosAproved.bind(this)
        this.handleOnCLicVerDocumentosInteresting = this.handleOnCLicVerDocumentosInteresting.bind(this)
        this.handleOnCLicVerDocumentosRejected = this.handleOnCLicVerDocumentosRejected.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.handleOnClickModificar = this.handleOnClickModificar.bind(this)
    }
    componentWillMount(){
        if(!localStorage.getItem('Admintoken')){
            return;
        }
        const id = this.props.location.search.substring(4)
        fetch(`${Url}/admin_convocation_details?id=${id}`, options).then(response => {
            if(!response.ok){
                throw new Error(response.status)
            }
            return response.json()
        }).then(jsonResponse=>{
            console.log(jsonResponse)
            this.setState({convocation : jsonResponse})

        }).catch(error=>{
            swal({
                type:'error',
                title: 'Algo fallo ...',
                text: 'no se pudieron obtener los aspirantes'+error.message
            })

        })

    }

    handleOnCLicVerDocumentosAproved(e){

        const index = e.target.id;
        let files=[];
        const currentUser = this.state.convocation.approved[index];

        fetch(`${Url}/admin_files?user_id=${currentUser.id}`,options).then(response =>{
            if(!response.ok){
                throw new Error (response.status + " " + response.code)
            }
            return response.json()
        }).then(jsonResponse=>{

            files = jsonResponse
            this.setState({ open: true,
                currentUser,
                files})

        }).catch(error =>{
            swal({
                type: 'error',
                title: "No se pudieron cargar los Archivos del estudiante "+ currentUser.name,
                text: error.message
            })
        })


        this.setState({ open: true,
            currentUser,
            files})

    }
    handleOnCLicVerDocumentosRejected(e){
        const index = e.target.id;
        let files=[];
        const currentUser = this.state.convocation.rejected[index];

        fetch(`${Url}/admin_files?user_id=${currentUser.id}`,options).then(response =>{
            if(!response.ok){
                throw new Error (response.status + " " + response.code)
            }
            return response.json()
        }).then(jsonResponse=>{

            files = jsonResponse
            this.setState({ open: true,
                currentUser,
                files})

        }).catch(error =>{
            swal({
                type: 'error',
                title: "No se pudieron cargar los Archivos del estudiante "+ currentUser.name,
                text: error.message
            })
        })




    }

    handleOnClickModificar(){
        const state = (document.getElementById('posibilidad').value)
        console.log(state)
        const options1 = {
            method:'PUT',
            headers: {
                "Authorization": localStorage.getItem('Admintoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({state})

        }
        swal({
            title: `¿Desea Modificar al estudiante ${this.state.currentUser.name}?`,
            showCancelButton: true,
            confirmButtonText: 'Modificar',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                return fetch(`${Url}/applications/${this.state.currentUser.application_id}`, options1)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        swal.showValidationError(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !swal.isLoading()
        }).then((result) => {
            if (result.value) {
                swal({
                    type: 'success',
                    title:'usuario modificado con exito'
                })
                window.location.reload();
            }
        })
    }

    handleOnCLicVerDocumentosInteresting(e){
        const index = e.target.id;
        let files=[];
        const currentUser = this.state.convocation.interested[index];

        fetch(`${Url}/admin_files?user_id=${currentUser.id}`,options).then(response =>{
            if(!response.ok){
                throw new Error (response.status + " " + response.code)
            }
            return response.json()
        }).then(jsonResponse=>{

            files = jsonResponse


            this.setState({ open: true,
                currentUser,
                files})

        }).catch(error =>{
            swal({
                type: 'error',
                title: "No se pudieron cargar los Archivos del estudiante "+ currentUser.name,
                text: error.message
            })
        })




    }
    onCloseModal = () => {
        this.setState({ open: false });
    };


    render(){
        const {open} = this.state;
        console.log(this.state.convocation)
        if(localStorage.getItem('Admintoken')){
            return(
                <div>
                    <div className="panel panel-primary col-md-3" align="center">
                        <div className="panel-heading "><h3 className="panel-title">Detalles De La Conovocatoria</h3>
                        </div>
                        <div className="panel-body ">
                            <div  className="este" align="center">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <label >Nombre de la conovocatoria: </label>
                                        <p>{`${this.state.convocation.name}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Descripcion de la conovocatoria: </label>
                                        <p>{`${this.state.convocation.description}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Para estudiantes de: </label>
                                        <p>{`${this.state.convocation.level}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Finaliza el: </label>
                                        <p>{`${this.state.convocation.end_date}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Vacantes:</label>
                                        <p> {`${this.state.convocation.vacants}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Disponibilidad de tiempo requerida: </label>
                                        <p>{`${this.state.convocation.hours_per_week}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label> Estímulo económico mensual: </label>
                                        <p>${`${this.state.convocation.payout}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Duración de la vinculación(dias): </label>
                                        <p>{`${this.state.convocation.vacants}`}</p>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Requisitos Generales:</label>
                                        <ol>
                                            {this.state.convocation.requeriments && this.state.convocation.requirements.map((requeriment)=>
                                                <li>{requeriment.description}</li>
                                            )}
                                        </ol>

                                    </li>
                                    <li className="list-group-item">
                                        <label>Dependencias:</label>
                                        <ol>
                                            {this.state.convocation.dependences && this.state.convocation.dependences.map((dependence)=>
                                                <li>{dependence.name}</li>
                                            )}
                                        </ol>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Perfil:</label>
                                        <ol>
                                            {this.state.convocation.profiles && this.state.convocation.profiles.map((prof)=>
                                                <li>{prof.description}</li>
                                            )}
                                        </ol>
                                    </li>
                                    <li className="list-group-item">
                                        <label>Actividades a realizar:</label>
                                        <ol>
                                            {this.state.convocation.activities && this.state.convocation.activities.map((activity)=>
                                                <li>{activity.description}</li>
                                            )}
                                        </ol>

                                    </li>
                                    <li className="list-group-item">
                                        <label>Archivos requeridos:</label>
                                        <ol>
                                            {this.state.convocation.required_files && this.state.convocation.required_files.map((required_file)=>
                                                <li>{required_file.name}</li>
                                            )}
                                        </ol>

                                    </li>
                                </ul>



                            </div>
                        </div>

                    </div>
                    <div className="col-md-3">
                        <table>
                            <caption align="center">Aprobados</caption><br/>
                            <thead>

                            <th>Nombre</th>
                            <th>Ver Documentos</th>
                            </thead>
                            {this.state.convocation.approved && this.state.convocation.approved.map((aspirant, index)=>
                                <tr key={index}>

                                    <td>{`${aspirant.name} ${aspirant.lastname}` }</td>
                                    <td id={index} onClick={this.handleOnCLicVerDocumentosAproved}>ver documentos </td>
                                </tr>
                            )}
                        </table>
                    </div>
                    <div className="col-md-3">
                        <table>
                            <caption align="center">Interesados</caption><br/>
                            <thead>

                            <th>Nombre</th>
                            <th>Ver Documentos</th>
                            </thead>
                            {this.state.convocation.interested && this.state.convocation.interested.map((aspirant, index )=>
                                <tr key={index}>

                                    <td>{`${aspirant.name} ${aspirant.lastname}`}</td>
                                    <td id={index} onClick={this.handleOnCLicVerDocumentosInteresting}>ver documentos </td>
                                </tr>
                            )}
                        </table>
                    </div>
                    <div className="col-md-3">
                        <table>
                            <caption align="center">Rechazados</caption><br/>
                            <thead>

                            <th>Nombre</th>
                            <th>Ver Documentos</th>
                            </thead>
                            {this.state.convocation.rejected && this.state.convocation.rejected.map((aspirant, index)=>
                                <tr key={index}>

                                    <td>{`${aspirant.name} ${aspirant.lastname}`}</td>
                                    <td id={index} onClick={this.handleOnCLicVerDocumentosRejected}>ver documentos </td>
                                </tr>
                            )}

                        </table>
                        <Modal
                            open={open}
                            onClose={this.onCloseModal}
                            center>
                            <div className="panel panel-default">
                                <div className="panel-heading">{`${this.state.currentUser.name} ${this.state.currentUser.lastname} Estado:${this.state.currentUser.state}`}</div>
                                <div className="panel-body col-md-12">
                                    <ol>
                                        { this.state.files.map((file, index)=>
                                           <li key={index}><a target="_blank" href={`${Url}${file.file.url}`}>{file.name || "archivo"}</a></li>
                                        )}
                                    </ol>
                                    <div className="container-fluid">

                                            <div className="col-md-8">
                                                {a}
                                            </div>
                                            <div className="col-md-4">
                                                <button  onClick={this.handleOnClickModificar}>Modificar</button>
                                            </div>
                                    </div>

                                </div>
                            </div>
                        </Modal>
                    </div>

                </div>


            )
        }else{return(<Forbbiden/>)}
    }
}
