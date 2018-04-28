// Dependencies
import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';




// Routes
import App from './components/routes.js';


firebase.initializeApp({

    apiKey: "AIzaSyDM-RFm2TB8UlMZ3PPHq2iaor2mQ_ETpio",
    authDomain: "ingsoft2frontnacional.firebaseapp.com",
    databaseURL: "https://ingsoft2frontnacional.firebaseio.com",
    projectId: "ingsoft2frontnacional",
    storageBucket: "",
    messagingSenderId: "723198454367"
});


render(
  <Router >
    <App />
  </Router>,
  document.getElementById('root')
);
