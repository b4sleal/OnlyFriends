import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './MainPage.scss';
import image from '../img/MainPage/match_image.png';
import { ProfileImage } from './components/ProfileImage';

export const MainPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    // homepage is simple as of now (testing design and color themes)
    return (
        <div>
            <section className="page-card">
                <div className="main-container">
                    <nav className="navbar navbar-light navbar-expand-md py-3">
                        <div className="container">
                            <a className="navbar-brand d-flex align-items-center" href="#home">
                                <span className="logo-name">OnlyFriends</span>
                            </a>
                            <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-3">
                                <span className="visually-hidden">Toggle navigation</span>
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navcol-3">
                                <ul className="navbar-nav mx-auto nav-links">
                                    <li className="nav-item">
                                        <a className="nav-link active" onClick={e => setPage(1)} href="#home" style={{ color: page == 1 ? 'black' : 'grey' }}>
                                            Home
                                            <span className="selected-page" style={{ display: page == 1 ? 'block' : 'none' }}></span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" onClick={e => setPage(2)} href="#About" style={{ color: page == 2 ? 'black' : 'grey' }}>
                                            About
                                            <span className="selected-page" style={{ display: page == 2 ? 'block' : 'none' }}></span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" onClick={e => setPage(3)} href="#Features" style={{ color: page == 3 ? 'black' : 'grey' }}>
                                            Features
                                            <span className="selected-page" style={{ display: page == 3 ? 'block' : 'none' }}></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="container py-5 ctn-1">
                        <div id="home" className="row row-cols-1 row-cols-md-2 d-flex justify-content-center align-items-center">
                            <div className="col mb-4">
                                <p className="pg-small"> <i className="fas fa-bolt" color="#a65aec" /> Find a match today</p>
                                <div>
                                    <h1 className="title-header">A new way to<br />make connections<br />on campus</h1>
                                    <p className="pg">A safe place for students<br />to date and make friends<br /></p>
                                    <div className="button-container">
                                        <button className="default-btn create-acc-btn" type="submit" onClick={() => navigate("/register")}>Create Account</button>
                                        <button className="default-btn login-btn" type="submit" onClick={() => navigate("/loginpage")}>Login</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col" style={{ position: 'relative' }}>
                                <ProfileImage image={image} />
                                {/* <div>
                                    <p className="pg-small-2"> <FontAwesomeIcon icon={faBolt} color="white" /> 50% Match!</p>
                                </div>
                                <img className="match-image" src={image} width={350} height={550} />

                                <div className="image-overlay" />

                                <div className="image-scroll-ctn">
                                    <div className="image-scroll-bar" />
                                    <div className="image-scroll-bar-2" />
                                    <div className="image-scroll-bar-2" />
                                    <div className="image-scroll-bar-2" />
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};