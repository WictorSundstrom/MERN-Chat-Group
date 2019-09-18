// Imports NPM packages
import React from 'react';
import ReactDOM from 'react-dom';
// Imports local components
import App from './Components/App';
// Imports Semantic UI for easier css usage
import 'semantic-ui-css/semantic.min.css'
// Imports a "normal" css file for local changes that we dont want to add globally to all semantic UI
import './css/style.css'



// Sends App Components to the element with the ID root in index.html
ReactDOM.render(<App />, document.getElementById('root'));

