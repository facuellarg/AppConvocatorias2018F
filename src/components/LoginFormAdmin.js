import React, {Component} from 'react';
import {Url} from './Url.js'
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert2'
import PropTypes from "prop-types";

function handleErrors(response) {
    if (!response.ok) {
        throw Error("correo o contraseña incorrectos "+response.statusText);
    }
    return response.json();
}

export class LoginFormAdmin extends Component{
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state={isLogged:0, data:null};
        this.handleOnSubmitLogin = this.handleOnSubmitLogin.bind(this);
    }


    validateEmail(email) {
        var re = /[a-zA-Z]+@+unal.edu.co/;
        return re.test(email);
    }

    async handleOnSubmitLogin(e){

        e.preventDefault();

        const email = this.refs.email.value.toLowerCase();
        const password = this.refs.password.value;
        var data = JSON.stringify({
            "auth":{email, password}
        });

        const options={
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data,
        }

        if(!this.validateEmail(email)){
            alert("el correo debe ser un correo de la universidad nacional (example@unal.edu.co)")
            return;
        }

        fetch(Url+"/admin_token", options)
            .then(handleErrors)
            .then(function(jsonResponse) {
                localStorage.setItem('Admintoken', jsonResponse.jwt);
                window.location.reload()
            }).catch(function(error) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: error.message,

            })
        });
    }
    render(){

            if(!localStorage.getItem('Admintoken')){
                return(
                    <div className="col-md-4 col-md-offset-4" align="center">
                        <form style={{textAlign: 'center'}} id='formularioSesion' onSubmit={this.handleOnSubmitLogin}>
                            <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
                                <input ref="email" type="text" className="form-control" name="email" placeholder="Correo Institucional"/>
                            </div>
                            <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
                                <input ref="password" type="password" className="form-control" name="password" placeholder="Contraseña"/>
                            </div>
                            <input className="btn btn-success width" type="submit" value="Iniciar sesion"/><br/>
                            <Link to="/recordarContraseña"> ¿Haz olvidado tu Contraseña? </Link>

                        </form>
                    </div>
                )
            }else if(!localStorage.getItem('token')){
                return( <Redirect to="/" />)
            }else{
                return( <Redirect to="/CuentaAdmin" />)
            }
        

    }

}