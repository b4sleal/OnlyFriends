import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));

//React strict mode
// will render pages twice to compile any errors (for development purposes)
root.render(
    //    <React.StrictMode>
    <BrowserRouter>
        {routes}
    </BrowserRouter>
    //    </React.StrictMode>
);

module.hot.accept();