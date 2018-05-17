import React,{Component} from 'react';
import {Url} from "./Url";
import swal from 'sweetalert2';
import './css/Aspirantes.css'

export class Aspirantes extends Component{
    constructor(props){
        super(props)
        this.state ={files:["http://robotica.uv.es/pub/Libro/PDFs/CAPI5.pdf",
                "https://cimec.org.ar/~mstorti/aed/aednotes.pdf",], currentFile: 0, student :{}, id:''}
        this.handleOnClickLeft = this.handleOnClickLeft.bind(this)
        this.handleOnClickRight = this.handleOnClickRight.bind(this)
        this.handleOnClickAprobar = this.handleOnClickAprobar.bind(this);
    }

    componentWillMount(){
        const options ={
            headers: {
                "Authorization": localStorage.getItem('Admintoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }

        }

        const id = this.props.location.search.substring(12)
        fetch(`${Url}/file_user?id=${id}`,options).then(response=>{
            if(!response.ok){
                throw new Error(`${response.status} ${response.code}`);
            }return response.json()
        }).then(jsonResponse=>{
                this.setState({files : jsonResponse, id})
        }).catch(error=>{
            swal({
                type: 'error',
                title: 'No se cargaron los archivos del estudiante',
                text: error.message
            })
        })

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
        if(cf < this.state.files.length -1){
            cf = cf + 1;
            this.setState({currentFile: cf})

        }
    }
    handleOnClickAprobar(){
        const options = {
            method:'POST',
            headers: {
                "Authorization": localStorage.getItem('Admintoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        swal({
            title: `¿Desea Aprobar al estudiante ${this.state.student.name}?`,
            showCancelButton: true,
            confirmButtonText: 'Aprobar',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                return fetch(`${Url}/aspirante`, options)
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
                    title: `${result.value.login}'s avatar`,
                    imageUrl: result.value.avatar_url
                })
            }
        })
    }
    render(){

         return(<div className="container-fluid divAspirantes" align="center" >
             <object width="50%"
                     data={this.state.files[this.state.currentFile]}>
              </object>

             {/* <h1>{this.state.files[this.state.currentFile]}</h1>*/}
                 <div className="btn-group" align="center">
                     <button className="btn btn-default" onClick={this.handleOnClickLeft} ref="left"><i className="fa fa-caret-left"></i></button>
                     <button className="btn btn-default" onClick={this.handleOnClickAprobar}>Aprobar</button>
                     <button className="btn btn-default"  onClick={this.handleOnClickRight} ref="right"><i className="fa fa-caret-right"></i></button>
                 </div>
         </div>)
    }
}