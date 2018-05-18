import React,{Component} from 'react'
import {Bar} from 'react-chartjs-2'
import {Url} from './Url';
import swal from   'sweetalert2'

const options ={
    headers: {
        "Authorization": localStorage.getItem('Admintoken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

}

export class VerEstadisticas extends  Component{
    constructor(props){
        super(props)
        this.state = {convocations:[]}
    }

    componentWillMount(){
        fetch(`${Url}/wanted_convocations`,options).then(response =>{
            if(!response.ok){
                throw new Error(response.states + " " + response.code)
            }
            return response.json()
        }).then(jsonResponse=>{
            console.log(jsonResponse)
            this.setState({convocations:jsonResponse})
        }).catch(error=>{
            swal({
                type:'error' ,
                title:'No se pudieron cargar las convocatorias' ,
                text: error.message ,
            })
        })
    }


    render(){
        console.log(this.state.convocations)
        let labels =[];
        let data =[];
        this.state.convocations.map((convocation)=>{
            labels.push(convocation.name);
            data.push(convocation.count);
        })
        const info = {
            labels,
            datasets: [
                {
                    label: 'Estudiantes Postulados',
                    backgroundColor: 'rgba(148, 180, 59,0.2)',
                    borderColor: 'rgba(148, 180, 59,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(148, 180, 59,0.5)',
                    hoverBorderColor: 'rgba(148, 180, 59,1)',

                    data

                }
            ]
        };
        return(
            <div align="center">
                <h2>Las 10 Convocatorias Mas pedidas</h2>
                <Bar
                    data={info}
                    width={100}
                    height={400}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:5}}]
                        },
                    }}
                />
            </div>
        )
    }
}