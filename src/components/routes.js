
import React from 'react';
import { Route, Switch } from 'react-router-dom';


import {Background} from './Background.js';
import {FiltroConvocatoria} from './FiltroConvocatoria.js';
import {Formulario} from './Formulario.js'
import {RecordarContraseña} from './RecordarContraseña.js'

import {Convocatorias} from './Convocatorias.js'
import {ConvocatoriaDetalles} from './ConvocatoriaDetalles.js'

// import {LoginForm} from './LoginForm.js'
// import {RegistForm} from './RegistForm.js'



const AppRoutes = () =>
  <Background>
    <Switch>
      <Route exact path="/" component={Formulario} /> 
      <Route exact path="/fconvocatoria" component={FiltroConvocatoria}/>
      <Route exact path="/recordarContraseña" component={RecordarContraseña}/>
      <Route exact path="/Convocatorias" component={Convocatorias}/>
      <Route exact path="/verdetalles" component={ConvocatoriaDetalles}/>

      
    </Switch>
  </Background>;

export default AppRoutes;