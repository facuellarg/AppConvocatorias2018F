import React from 'react';
import ReactDOM from 'react-dom';
import {Url} from './Url.js'
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import swal from 'sweetalert2'



export class Files extends React.Component {

    constructor() {
        super()
        this.state = {
            files: []

        }
        this.onSubmit=this.onSubmit.bind(this);
    }


    onSubmit(e){


        let axiosConfig = {
            headers: {
                "Authorization": localStorage.getItem('token'),
                'Content-Type': 'application/json;'

            }
        };
        axios.post(`${Url}/documents`, {
            file: this.state.files.base64


        }, axiosConfig)
            .then(response => {
                swal({
                    type:'success',
                    title:'Archivo Subido'
                })
            })
            .catch(error => {
                swal({
                    type:'error',
                    title:'Error al subir archivo',
                    text: error.message
                })
            });
    }
    // Callback~
    getFiles(files){
        this.setState({ files: files })
    }



    render() {

        return (

            <div class="col-md-3">

                <FileBase64
                    multiple={ false }
                    onDone={this.getFiles.bind(this)}  />
                <button type= "submit" onClick={this.onSubmit} >Subir </button>




            </div>
        )
    }

}