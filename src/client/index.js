import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    </React.StrictMode>
);

module.hot.accept();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();