import React, {Component} from 'react';
import {Url} from './Url.js'


export class RecordarContraseña extends Component{
	constructor(){
		super()
	}
	render(){
		return(
			<div style={{textAlign: 'center'}}>
				<form>
					<input  ref="email" type="text" name="correoInstitucional" placeholder="Correo institucional" /><br/>

				</form>
			</div>
			)
	}
}