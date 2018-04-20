
import React from 'react';
import { Route, Switch, browserHistory } from 'react-router-dom';


import {Background} from './Background.js';
import {FiltroConvocatoria} from './FiltroConvocatoria.js';
import {Formulario} from './Formulario.js'
import {RecordarContraseña} from './RecordarContraseña.js'

import {Convocatorias} from './Convocatorias.js'
import {ConvocatoriaDetalles} from './ConvocatoriaDetalles.js'
import {Forbbiden} from './Forbbiden.js'
import {MiCuenta} from './MiCuenta.js'

// import {LoginForm} from './LoginForm.js'
// import {RegistForm} from './RegistForm.js'



const AppRoutes = () =>
  <Background>
    <Switch>
      <Route exact path="/MiCuenta" component={MiCuenta}/>
    	<Route exact path="/Forbbiden" component={Forbbiden} /> 
      <Route exact path="/" component={Formulario} /> 
      <Route exact path="/fconvocatoria" component={FiltroConvocatoria}/>
      <Route exact path="/recordarContraseña" component={RecordarContraseña}/>
      <Route exact path="/Convocatorias" component={Convocatorias}/>
      <Route exact path="/verdetalles" component={ConvocatoriaDetalles}/>
      

      
    </Switch>
  </Background>;

export default AppRoutes;