import React,{Component} from 'react'
import {Bar} from 'react-chartjs-2'



export class VerEstadisticas extends  Component{
    constructor(props){
        super(props)
    }



    render(){
        /*let labels =[];
        let data =[];
        this.props.conovocatorias.map((convocation)=>{
            labels.append(convocation.name);
            data.append(convocation.postulates);
        })
        */const info = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Estudiantes Postulados',
                    backgroundColor: 'rgba(148, 180, 59,0.2)',
                    borderColor: 'rgba(148, 180, 59,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(148, 180, 59,0.5)',
                    hoverBorderColor: 'rgba(148, 180, 59,1)',
                    data: [200, 59, 80, 81, 56, 55, 10]
                }
            ]
        };
        return(
            <div align="center">
                <h2>Las 10 Convocatorias Mas pedida s</h2>
                <Bar
                    data={info}
                    width={100}
                    height={400}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}