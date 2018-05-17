import React,{Component} from  'react'
import PropTypes from 'prop-types';
import {Url} from "./Url";
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
        this.state = {convocations:[0], aspirants:[]}
        this.handleOnClickVerAspirantes = this.handleOnClickVerAspirantes.bind(this)

    }

    componentWillMount(){

        fetch(`${Url}/admin_convocations`,options).then(response=>{
            if(!response.ok){

                throw new Error(response.status);
            }
            return response.json()
        }).then(jsonResponse=>{

            this.setState({convocations: jsonResponse})
        }).catch(error=>{
            swal({
                type:'error',
                title: 'Algo fallo...',
                text:error.message
            })
        })
    }



    handleOnClickVerAspirantes(e) {
        const id = e.target.id


    }

    render(){
        console.log(this.state.aspirants)
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

                        {this.state.convocations.map((convocation)=>
                            <tr key={convocation.id}>
                                <td>{convocation.name}</td>
                                <td>{convocation.end_date}</td>
                                <td  ><Link to={`/detallesAspirantes?id=${convocation.id}`} >Ver Detalles</Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="col-md-6" align="center">
                <table>
                    <thead>
                        <th className='header'> Estudiante</th>
                        <th className='header'> Ver Archivos</th>
                    </thead>
                    {this.state.aspirants && this.state.aspirants.map(
                        (aspirant)=>
                        <tr key={aspirant.id}>
                            <td>{aspirant.email}</td>
                            <td><Link to={`/aspirante?id=${aspirant.id}`}  >Ver Archivos</Link></td>
                        </tr>
                    )}
                </table>

            </div>
        </div>)
    }
}