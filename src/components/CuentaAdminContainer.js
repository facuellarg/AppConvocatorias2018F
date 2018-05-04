import React,{Component} from 'react';
import {CuentaAdmin} from "./CuentaAdmin";
import {Delay} from "./Delay";
import {Url} from "./Url";

export class CuentaAdminContainer extends Component{
    constructor(){
        super()
        this.state = {dependences:[]}

    }
    async componentWillMount() {
        if (!localStorage.getItem('token')) {
            return;
        }

        // !(store.getState().name === undefined)
        // await this.setState({dependences:dependences})
        // peticion para tener todas las dependencias
        try{
            const options ={
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        let response =  await fetch(Url+'/dependences', options)
            if(response.ok){
            let jsonResponse = response.json();
                let a;
                await jsonResponse.then(function(value) {
                    a = value;

                });
                await this.setState({dependences:a})
                return;

                throw new Error('No se pudieron cargar las dependencias')
            }
        throw new Error('No se pudieron cargar las dependencias')
        }catch(error){
            console.log(error.message)
        }


    }
        render(){
            console.log(this.state.dependences)
        return(

            <div align="center"><Delay wait={500}> <CuentaAdmin/></Delay></div>
        )
    }

}