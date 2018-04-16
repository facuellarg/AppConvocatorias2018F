
import React from 'react';
import { Route, Switch } from 'react-router-dom';


import {Background} from './Background.js';
import {FiltroConvocatoria} from './FiltroConvocatoria.js';
import {Formulario} from './Formulario.js';
import {MiCuenta} from './MiCuenta.js';
import {LoginForm} from './LoginForm.js';
import {RegistForm} from './RegistForm.js';

    //
 //<Route exact path="/" component={Formulario} />
 //<Route exact path="/" component={FiltroConvocatoria}/>

const AppRoutes = () =>
  <Background>
    <Switch>
     
     <Route exact path="/" component={MiCuenta}/>   
     
      
    </Switch>
  </Background>;

export default AppRoutes;