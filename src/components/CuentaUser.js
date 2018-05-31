import React, {Component} from 'react';
import './css/cuenta.css';

import store from './store';
import {Url} from './Url';
import {Files} from './Files.js';
import swal from 'sweetalert2'
import Modal from 'react-responsive-modal';

var aux = []

export class CuentaUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            documents: [{name:"",file:{url:""}}],
            currentFile:0,
            open: false
        }

        this.onClickActualizar = this.onClickActualizar.bind(this);
        this.onClickGuardar = this.onClickGuardar.bind(this);
        this.handleFiles=this.handleFiles.bind(this);
        this.handleOnClickLeft = this.handleOnClickLeft.bind(this);
        this.handleOnClickRight = this.handleOnClickRight.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this)
    }

    handleFiles(){


        /*let axiosConfig = {
            headers: {
                "Authorization": localStorage.getItem('token'),
                'Content-Type': 'application/json;'
            }
        };
        axios.get(`${Url}/documents`, axiosConfig)
            .then(function (response) {
                response.data.forEach(function(obj){
                    aux.push(obj.file.url)
                })
            })
            .catch(function (error) {
                console.log(error)
            });
        this.setState({documents: (aux)})*/
        const options={
            headers: {
                "Authorization": localStorage.getItem('token'),
                'Content-Type': 'application/json;'
            }
        }

        fetch(`${Url}/documents`,options).then(res=>{
            if(!res.ok){
                throw new Error(res.status+" "+res.code)
            }return res.json()
        }).then(jsonResponse=>{
            this.setState({documents:jsonResponse, open:true})
            console.log(this.state.documents)
        }).catch(error=>{
            console.log(error.message)
        })


    }


    componentDidMount(){
        this.refs.selectDependence.value = store.getState().dependence_id;
        this.refs.selectLevel.value = store.getState().level;
    }

    handleOnClickLeft(){
        let cf= this.state.currentFile
        if(cf>0){
            cf = cf - 1;
            this.setState({currentFile: cf})
        }
    }
    handleOnClickRight(){
        let cf= this.state.currentFile
        if(cf < this.state.documents.length -1){
            cf = cf + 1;
            this.setState({currentFile: cf})

        }
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
                swal({
                    type: 'success',
                    title: 'Datos Actualizados',

                })
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
    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const {open} = this.state;

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
                                    <div className="col-md-4">
                                        <div className="container-fluid">
                                            <Files/>

                                        </div>

                                        <div class= "col-md-4" >
                                            <br/>
                                            <div style = {{marginLeft: `${10}px`}}>

                                                <button  className= "btn btn-success" onClick={this.handleFiles}>ver archivos</button>

                                            </div>
                                            <div>
                                                <Modal
                                                    open={open}
                                                    onClose={this.onCloseModal}
                                                    center>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading">{this.state.currentFile}</div>
                                                        <div className="panel-body col-md-12">
                                                            <div className="container-fluid" align="center" >
                                                                <object width="50%"
                                                                        data={`${Url}/${this.state.documents[this.state.currentFile].file.url}`}>
                                                                </object>


                                                                <div className="row">
                                                                    <div className="btn-group" align="center">
                                                                        <button className="btn btn-default" onClick={this.handleOnClickLeft} ref="left"><i className="fa fa-caret-left"></i></button>
                                                                        <button className="btn btn-default"> <i className="fa fa-trash"></i></button>
                                                                        <button className="btn btn-default"  onClick={this.handleOnClickRight} ref="right"><i className="fa fa-caret-right"></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </Modal>
                                                <ol>
                                                    {/*this.state.documents && this.state.documents.map((doc,key)=>
                                                        <li key={key}><a target="_blank" href={`${Url}/${doc.file.url}`}>{doc.name || "Archivo"}</a></li>
                                                    )*/}
                                                </ol>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="col-sm-4 padding-profile">
                                        <div className="caja">
                                            <h4 id="correo" ref="email" className="s-property-title">{`${store.getState().email}`}</h4>
                                            <input className="form-control" id="inputName" ref="name" type="text" readOnly="readOnly" defaultValue={`${store.getState().name}`} ></input>
                                            <input className="form-control" id="inputName" ref="lastname" type="text" readOnly="readOnly" defaultValue={`${store.getState().lastname}`}></input>
                                        </div>
                                        <label>Dependencia:</label>
                                        <select ref="selectDependence" className="form-control" disabled>
                                            { this.props.dependences.map((dependence, key)=>
                                                <option key={key} value={dependence.id} >{dependence.name}</option>)}
                                            )}

                                        </select><br/>
                                        <label>Pregrado/Postgrado:</label>
                                        <select ref="selectLevel" className="form-control" disabled>
                                            <option value="pregrado">Pregrado</option>
                                            <option value="postgrado">Postgrado</option>

                                        </select><br/>
                                        {/*<input className="input"id="inputPapa"type="number" ref="PAPA" placeholder="Ingrese su PAPA" min="0" max="5" readOnly="readOnly"  defaultValue={`${store.getState().PAPA}`}></input><br/>
												<input  className="input"id="inputPbm" type="number" ref="PBM" placeholder = "Ingrese su PBM" min="0"  readOnly="readOnly" defaultValue={`${store.getState().PBM}`}></input><br/>*/}
										<div className="row">
                                            <div className="col-md-12 container-fluid">
                                                <div  className="btn-group">
                                                    <button id ="botonGuardar" className="btn btn-success" onClick={this.onClickActualizar} >Modificar Datos</button>
                                                    <button id ="botonCerrar" className="btn btn-default" onClick={this.onClickGuardar} ref="guardar" >Guardar Cambios</button>
                                                    
                                                </div>
                                            </div>
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