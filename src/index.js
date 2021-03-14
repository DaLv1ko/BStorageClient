import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './js/App';
import reportWebVitals from './js/reportWebVitals';






ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ,
    document.getElementById('root'),

);



reportWebVitals();
