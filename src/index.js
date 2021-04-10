import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './js/App';
import registerServiceWorker from "react-service-worker";
import reportWebVitals from './js/reportWebVitals';


ReactDOM.render(
        <App/>,
    document.getElementById('root'),
);

// registerServiceWorker.register()
registerServiceWorker().register()