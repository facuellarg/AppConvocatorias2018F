import React,{Component} from  'react'
import PropTypes from 'prop-types';
import {Url} from "./Url";
import swal from 'sweetalert2';
import {Link,Redirect} from 'react-router-dom'
import './css/ConvocatoriaAspirantes.css'

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
        if(!localStorage.getItem('Admintoken')){
            return
        }

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
       if(localStorage.getItem('Admintoken')){
           return(
               <div className='col-md-6 col-md-offset-3' align="center">
                   <table className="convTable">
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
               </div>)
       }else{
           return <Redirect to="/" />
       }

    }
}