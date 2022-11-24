import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './MainPage.scss';
import image from '../img/MainPage/match_image.png';
import { ProfileImage } from './components/ProfileCard';

export const MainPage = () => {
    const [page, setPage] = useState(1);

    // homepage is simple as of now (testing design and color themes)
    return (
        <div>
            <section className="page-card">
                <NavBar setPage={setPage} page={page}></NavBar>
                <Main />
                <About />
            </section>
        </div>
    );
};


const About = () => {

    return (
        <div id="About">
            The purpose of Onlyfriends is to connect university students with others based on different
        </div>
    );
};

const NavBar = ({ setPage, page }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-light navbar-expand-md py-3">
            <div className="container justify-content-normal" style={{ maxWidth: '1200px', margin: 0 }}>
                <a className="navbar-brand d-flex align-items-center" href="">
                    <span className="logo-name">OnlyFriends</span>
                </a>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-3">
                    <span className="visually-hidden">Toggle navigation</span>
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navcol-3">
                    <ul className="navbar-nav mx-auto nav-links">
                        <div style={{ width: 'fit-content' }}>
                            <li className="nav-item">
                                <a className="nav-link active" onClick={e => setPage(1)} href="#Home" style={{ color: page == 1 ? 'black' : 'grey' }}>
                                    Home
                                    <span className="selected-page" style={{ display: page == 1 ? 'block' : 'none' }}></span>
                                </a>
                            </li>
                        </div>
                        <li className="nav-item">
                            <div style={{ width: 'fit-content' }}>
                                <a className="nav-link active" onClick={e => setPage(2)} href="#About" style={{ color: page == 2 ? 'black' : 'grey' }}>
                                    About
                                    <span className="selected-page" style={{ display: page == 2 ? 'block' : 'none' }}></span>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div style={{ width: 'fit-content' }}>
                                <a className="nav-link active" onClick={e => setPage(3)} href="#Features" style={{ color: page == 3 ? 'black' : 'grey' }}>
                                    Features
                                    <span className="selected-page" style={{ display: page == 3 ? 'block' : 'none' }}></span>
                                </a>
                            </div>

                        </li>
                    </ul>
                    <button className="default-btn login-btn" type="submit" onClick={() => navigate("/loginpage")}>Login</button>
                </div>
            </div>
        </nav>
    );
};

const Main = () => {

    return (
        <div id="Home" className="main-container">
            <div className="container py-5 ctn-1" style={{ maxWidth: '1200px' }}>

                <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-between align-items-center">
                    <div className="col mb-4">
                        <p className="pg-small"> <i className="fas fa-bolt" color="#a65aec" /> Find a match today</p>
                        <div>
                            <h1 className="title-header">A new way to<br />make connections<br />on campus</h1>
                            <p className="pg">A safe place for students<br />to date and make friends<br /></p>
                            <div className="button-container">
                                <button className="default-btn create-acc-btn" type="submit" onClick={() => navigate("/register")}>Start Searching</button>
                            </div>
                        </div>
                    </div>
                    <div className="col col-2" style={{ position: 'relative', width: '350px' }}>
                        <ProfileImage image={image} name={"Sydney"} age={"23"} />
                    </div>
                </div>
            </div>
        </div>
    );
};
