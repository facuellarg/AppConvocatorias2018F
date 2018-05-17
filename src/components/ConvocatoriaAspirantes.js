import React,{Component} from  'react'
import PropTypes from 'prop-types';
import {Url} from "./Url";
import store from  './store.js'
import swal from 'sweetalert2';
import {Link} from 'react-router-dom'

const options ={
    headers: {
        "Authorization": localStorage.getItem('Admintoken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

}
export class ConvocatoriaAspirantes extends Component{
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {convocations:[], aspirants:[]}
        this.handleOnClickVerAspirantes = this.handleOnClickVerAspirantes.bind(this)

    }

    componentWillMount(){

        fetch(`${Url}/convocations?admin_id=${store.getState().id}`,options).then(response=>{
            if(!response.ok){
                console.log(response.json())
                throw new Error(response.status);
            }
            return response.json()
        }).then(jsonResponse=>{
            this.setState({convocations:jsonResponse.convocations})
        }).catch(error=>{
            swal({
                type:'error',
                title: 'Algo fallo...',
                text:error.message
            })
        })
    }



    handleOnClickVerAspirantes(e) {
        fetch(`${Url}/convocations/aspirantes`, options).then(response => {
            if(!response.ok){
                throw new Error(response.status)
            }
            return response.json()
        }).then(jsonResponse=>{
        this.setState({aspitantes:jsonResponse})

        }).catch(error=>{
            swal({
                type:'error',
                title: 'Algo fallo ...',
                text: 'no se pudieron obtener los aspirantes'+error.message
            })
        })
    }

    render(){
        return(<div className='container-fluid'>
            <div className='col-md-6 ' align="center">
                <table>
                    <thead>
                        <tr>
                          <th className='header'>Convocatoria</th>
                          <th className='header'>Fecha de Finalizacion</th>
                            <th className='header'>Aspirantes</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.convocations.map((convocation,key)=>{
                            <tr key={key}>
                                <td>{convocation.name}</td>
                                <td>{convocation.end_date}</td>
                                <td id={convocation.id} onClick={this.handleOnClickVerAspirantes}> Ver Aspirantes</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <div className="col-md-6" align="center">
                <table>
                    <thead>
                        <th className='header'> Estudiante</th>
                        <th className='header'> Ver Archivos</th>
                    </thead>
                    {this.state.aspirants.map((aspirant, key)=>{
                        <tr key={key}>
                            <td>{aspirant.email}</td>
                            <Link to={`/aspiarante?id=${aspirant.id}`}  ></Link>
                        </tr>
                    })}
                </table>

            </div>
        </div>)
    }
}