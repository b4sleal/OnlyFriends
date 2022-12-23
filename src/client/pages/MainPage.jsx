import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './MainPage.scss';
import image1 from '../img/MainPage/match_image.png';
import image2 from '../img/MainPage/match_image2.png';
import image3 from '../img/MainPage/Simon.png';
import image4 from '../img/MainPage/match_image4.png';
import image5 from "../img/MainPage/Liam.png";
import { ProfileImage } from './components/ProfileCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from "swiper";

import 'swiper/css';
import "swiper/css/effect-cards";
export const MainPage = () => {
    const [page, setPage] = useState(1);

    // homepage is simple as of now (testing design and color themes)
    return (
        <div>
            <section className="page-card">
                <NavBar setPage={setPage} page={page}></NavBar>
                <Main />
            </section>
        </div>
    );
};

const About = () => {
    return (
        <>
            <div id="About" style={{ marginTop: '100px' }}>
                <div style={{ fontSize: '40px' }}>
                    <i class="fa-solid fa-school-flag" style={{ color: "#a65aec" }}></i>
                    <span className="small-title-header">Inclusive</span>
                    <p className="pg">Only match with people within your school</p>
                </div>
            </div>
            <div style={{ marginTop: '100px' }}>
                <div style={{ fontSize: '40px' }}>
                    <i class="fa-solid fa-users-medical" style={{ color: "#a65aec" }}></i>
                    <span className="small-title-header">20k+ Users</span>
                    <p className="pg">Search thousands of peope in your school<br />and even in nearby schools </p>
                </div>
            </div>
        </>
    );
};

const Features = () => {

};

import logo from '../img/Homepage/OF.png';

const NavBar = ({ setPage, page }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-light navbar-expand-md py-3">
            <div className="container justify-content-normal" style={{ maxWidth: '1200px', margin: 0 }}>
                <a className="navbar-brand d-flex align-items-center" href="">
                    <img src={logo} alt="logo" height={'40px'} />
                    <span className="logo-name" style={{ marginLeft: '5px' }}>OnlyFriends</span>
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
    const navigate = useNavigate();

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
                    <div className="col col-2" style={{ position: 'relative', width: '350px', transform: 'scale(1.15)', marginTop: '30px', marginRight: '100px' }}>
                        <Swiper
                            effect={"cards"}
                            grabCursor={true}
                            modules={[EffectCards, Autoplay]}
                            autoplay={{ delay: 2000, stopOnLastSlide: true, waitForTransition: true, pauseOnMouseEnter: false }}
                            speed={1000}
                        >
                            <SwiperSlide><ProfileImage image={image1} name={"Sydney"} age={"20"} degree={"Computer Engineering"} verified={true} /></SwiperSlide>
                            <SwiperSlide><ProfileImage image={image2} name={"Olivia"} age={"23"} degree={"Biological and Chemical Sciences (PhD)"} verified={true} /></SwiperSlide>
                            <SwiperSlide><ProfileImage image={image3} name={"Simon"} age={"26"} degree={"Communication Studies (MA)"} /></SwiperSlide>
                            <SwiperSlide><ProfileImage image={image4} name={"Isabella"} age={"24"} degree={"Medicine"} verified={true} /></SwiperSlide>
                            <SwiperSlide><ProfileImage image={image5} name={"Liam"} age={"19"} degree={"Architecture"} verified={true} /></SwiperSlide>
                        </Swiper>
                    </div>
                    <About />
                </div>
            </div>
        </div>
    );
};