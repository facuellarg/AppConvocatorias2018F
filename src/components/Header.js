import React,{Component} from 'react';
import sealColombia from './images/sealColombia.png';
import escudoUnal from './images/escudoUnal.png';
import escudoUnalSvg from './images/escudoUnal.svg';
import escudoUnal_black from './images/escudoUnal_black.png';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {SignOut} from './SignOut.js'

export class Header extends Component{
	static propTypes = {
    items: PropTypes.array.isRequired
  }
	onClickCerrarSesion(){

	}


	render(){
		const { items } = this.props;
/*
<li className="item_Aspirantes #>"><a href="index.html#">Aspirantes</a></li>
										<li className="item_Estudiantes #>"><a href="index.html#">Estudiantes</a></li>
										<li className="item_Egresados #>"><a href="index.html#">Egresados</a></li>
										<li className="item_Docentes #>"><a href="index.html#">Docentes</a></li>
										<li className="item_Administrativos #>"><a href="index.html#">Administrativos</a></li>*/

							
		return(
			
			 
						<div id="Header">
						<div id="services">
						<div className="indicator hidden-xs"></div>
							<ul className="dropdown-menu">
					            <li>
										<a href="http://correo.unal.edu.co" target="_blank"><img src="images/icnServEmail.png" width="32" height="32" alt="Correo Electrónico"/>Correo Electrónico</a>
					            </li>
					            <li>
										<a href="http://www.sia.unal.edu.co" target="_blank"><img src="images/icnServSia.png" width="32" height="32" alt="Sistema de Información Académica"/>Sistema de Información Académica</a>
					            </li>
					            <li>
										<a href="http://www.sinab.unal.edu.co" target="_blank"><img src="images/icnServLibrary.png" width="32" height="32" alt="Biblioteca"/>Biblioteca</a>
					            </li>
					            <li>
										<a href="http://168.176.5.43:8082/Convocatorias/indice.iface" target="_blank"><img src="images/icnServCall.png" width="32" height="32" alt="Convocatorias"/>Convocatorias</a>
					            </li>
					            <li>
										<a href="http://identidad.unal.edu.co"><img src="images/icnServIdentidad.png" width="32" height="32" alt="Identidad U.N."/>Identidad U.N.</a>
					            </li>
							</ul>
						</div>
					<header id="unalTop">
						<div className="logo">
			            <a href="http://unal.edu.co">
							
								<svg width="93%" height="93%">
								<image xlinkHref="images/escudoUnal.svg" width="100%" height="100%" className="hidden-print"/>
								</svg>

								
								<img src="images/escudoUnal_black.png" className="visible-print" />
			            </a>
						</div>
						<div className="seal">
			            <img className="hidden-print" alt="Escudo de la República de Colombia" src="images/sealColombia.png" width="66" height="66" />

			            <img className="visible-print" alt="Escudo de la República de Colombia" src="images/sealColombia_black.png" width="66" height="66" />
						</div>
						<div className="firstMenu">

			            <button className="navbar-toggle collapsed" type="button"  aria-controls="bs-navbar" aria-expanded="false">
								<span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
							</button>
			            <div className="btn-group languageMenu hidden-xs">
								<div className="btn btn-default dropdown-toggle" data-toggle="dropdown">es<span className="caret"></span></div>
								<ul className="dropdown-menu">
									<li><a href="index.html#">es</a></li>
									<li><a href="index.html#">en</a></li>
								</ul>
			            </div>
			            <ul className="socialLinks hidden-xs">
								<li>
									<a href="https://www.facebook.com/UNColombia" target="_blank" className="facebook" title="Página oficial en Facebook"></a>
								</li>
								<li>
									<a href="https://twitter.com/UNColombia" target="_blank" className="twitter" title="Cuenta oficial en Twitter"></a>
								</li>
								<li>
									<a href="https://www.youtube.com/channel/UCnE6Zj2llVxcvL5I38B0Ceg" target="_blank" className="youtube" title="Canal oficial de Youtube"></a>
								</li>
								<li>
									<a href="http://agenciadenoticias.unal.edu.co/nc/sus/type/rss2.html" target="_blank" className="rss" title="Suscripción a canales de información RSS"></a>
								</li>
			            </ul>
			            <div className="navbar-default">
								<nav id="profiles">
									<ul className="nav navbar-nav dropdown-menu">
									{localStorage.getItem('token') &&
									items && items.map(
		                (item, key) => <li  key={key}>
		                <Link  to={item.url}>{item.title}</Link></li>
		              		)}
										<SignOut/>
									</ul>
								</nav>
			            </div>
						</div>
						<div id="bs-navbar" className="navbar-collapse collapse navigation">
			            <div className="site-url">
								<a href="http://subdominio.unal.edu.co/">subdominio.unal.edu.co</a>
			            </div>
			            <div className="buscador">
								<div className="gcse-searchbox-only" ></div>
			            </div>
			            <div className="mainMenu">
								<div className="btn-group"><a href="index.html#" className="btn btn-default dropdown-toggle">Item menu ejemplo</a><span className="caret-right"></span></div>
								<div className="btn-group">
									<div className="btn btn-default dropdown-toggle" data-toggle="dropdown">Sedes<span className="caret"></span></div>
									<ul className="dropdown-menu dropItem-16">
										<li><a href="http://amazonia.unal.edu.co" target="_blank">Amazonia</a><span className="caret-right"></span></li>
										<li><a href="http://bogota.unal.edu.co" target="_blank">Bogotá</a><span className="caret-right"></span></li>
										<li><a href="http://caribe.unal.edu.co" target="_blank">Caribe</a><span className="caret-right"></span></li>
										<li><a href="http://delapaz.unal.edu.co" target="_blank">De La Paz</a><span className="caret-right"></span></li>
										<li><a href="http://www.manizales.unal.edu.co" target="_blank">Manizales</a><span className="caret-right"></span></li>
										<li><a href="http://medellin.unal.edu.co" target="_blank">Medellín</a><span className="caret-right"></span></li>
										<li><a href="http://orinoquia.unal.edu.co" target="_blank">Orinoquia</a><span className="caret-right"></span></li>
										<li><a href="http://www.palmira.unal.edu.co" target="_blank">Palmira</a><span className="caret-right"></span></li>
										<li><a href="http://tumaco-pacifico.unal.edu.co" target="_blank">Tumaco</a><span className="caret-right"></span></li>
									</ul>
								</div>
			            </div>
			            <div className="btn-group hidden-sm hidden-md hidden-lg hidden-print">
								<div className="btn btn-default dropdown-toggle" data-toggle="dropdown" id="unalOpenMenuServicios" data-target="#services">Servicios<span className="caret"> </span>
								</div>
			            </div>
			            <div className="btn-group hidden-sm hidden-md hidden-lg hidden-print">
								<div className="btn btn-default dropdown-toggle" data-toggle="dropdown" id="unalOpenMenuPerfiles" data-target="#profiles">Perfiles<span className="caret"> </span>
								</div>
			            </div>
						</div>

					</header>
						</div>
			)
	} 

}