
import React from 'react';
import { Route, Switch } from 'react-router-dom';


import {Background} from './Background.js';
import {FiltroConvocatoria} from './FiltroConvocatoria.js';
import {Formulario} from './Formulario.js'
// import {LoginForm} from './LoginForm.js'
// import {RegistForm} from './RegistForm.js'



const AppRoutes = () =>
  <Background>
    <Switch>
      <Route exact path="/" component={Formulario} /> 
      <Route exact path="/convocatoria" component={FiltroConvocatoria}/>
     
    </Switch>
  </Background>;

export default AppRoutes;