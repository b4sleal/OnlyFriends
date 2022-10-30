import React from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.scss';

export const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <section className="page-card">

            </section>
        </div>
    );
};