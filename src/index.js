// Dependencies
import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import App from './components/routes.js';



// Assets
firebase.initializeApp({

	apiKey: "AIzaSyAwoM5rgr1lVdAgvuGgkB3RXxyXQF-MOQw",
	authDomain: "fotos-7f2f9.firebaseapp.com",
	databaseURL: "https://fotos-7f2f9.firebaseio.com",
	projectId: "fotos-7f2f9",
	storageBucket: "fotos-7f2f9.appspot.com",
	messagingSenderId: "288744483583"
              
});



render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
