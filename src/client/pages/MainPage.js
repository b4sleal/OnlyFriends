import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.scss';

import image from '../img/MainPage/sitting.svg';

export const MainPage = () => {
    const navigate = useNavigate();

    // homepage is simple as of now (testing design and color themes)
    return (
        <div>
            <section className="page-card">
                <div className="main-container">
                    <nav className="navbar navbar-light navbar-expand-md py-3">
                        <div className="container">
                            <a className="navbar-brand d-flex align-items-center" href="/">
                                <span className="logo-name">OnlyFriends</span>
                            </a>
                            <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-3">
                                <span className="visually-hidden">Toggle navigation</span>
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navcol-3">
                                <ul className="navbar-nav mx-auto nav-links">
                                    <li className="nav-item"><a className="nav-link active" href="/">link1</a></li>
                                    <li className="nav-item"><a className="nav-link active" href="/">link2</a></li>
                                    <li className="nav-item"><a className="nav-link active" href="/">link3</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="container py-5 ctn-1">
                        <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center align-items-center">
                            <div className="col mb-4">
                                <div>
                                    <h1 className="title-header">A new way to<br />make connections<br />on campus</h1>
                                    <p className="pg">A safe place for students<br />to date and make friends<br /></p>
                                    <div className="button-container">
                                        <button className="default-btn create-acc-btn" type="submit" onClick={() => navigate("/register")}>Create Account</button>
                                        <button className="default-btn login-btn" type="submit" onClick={() => navigate("/loginpage")}>Login</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <img className="sitting-image" src={image} width={700} height={524} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};