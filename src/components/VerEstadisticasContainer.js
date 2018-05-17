import React,{Component} from 'react'
import {VerEstadisticas} from "./VerEstadisticas";
import {Url} from "./Url";

export class VerEstadisticasContainer extends Component{
    constructor(){
        super()
        this.state={convocations:{}}
    }

    async componentWillMount(){
        if(!localStorage.getItem('token')){
            return;
        }

        const options={
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }
        try{

            let response = await fetch(Url+'/search_convocations', options);

            if(response.ok ){
                let jsonResponse = await response.json();


                this.setState({convocations:jsonResponse.convocations})

                return
            }
            throw new Error("No se pudo obtener las convocatorias");
        }catch(error){
            alert(error.message)

        }

    }
    render(){
        return(
            <VerEstadisticas conovocatorias={this.state.convocations}/>
        )
    }
}