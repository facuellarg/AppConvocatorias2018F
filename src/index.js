// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import App from './components/routes.js';

// Assets


render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
