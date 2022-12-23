import React from 'react';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './ProfileCard.scss';

export const ProfileImage = ({ image, name, age, degree, verified }) => {
    const random = (min, max) => ~~(Math.random() * (max - min + 1)) + min;

    return (
        <div className="profile-card position-relative">
            <div>
                <p className="small d-flex align-items-center"> <i className="fas fa-bolt" color="white" /> {random(50, 90)}% Match!</p>
            </div>
            <img className="match-image" src={image} width={350} height={550} />

            <div className="image-overlay" />

            <div className="image-scroll-ctn d-flex">
                <div className="image-scroll-bar" />
                <div className="image-scroll-bar-2" />
                <div className="image-scroll-bar-2" />
                <div className="image-scroll-bar-2" />
            </div>

            <div className="position-absolute user-info-container">
                <div className="user-nearby-container">
                    <div className="user-nearby">
                        <p className="small-2"> Looking for friends</p>
                    </div>
                </div>
                <div className="name-age">
                    {name} {age}
                    {verified && <i className="fas fa-badge-check verified-badge" />}
                </div>

                <div style={{ color: 'white', marginBottom: '30px', fontFamily: 'Segoe UI' }}>
                    <i className="fa-duotone fa-lg fa-graduation-cap" style={{ color: "#a65aec", marginRight: "5px" }}></i>
                    {degree || "Bachelor of Arts (BA)"}
                </div>

                <div className="d-flex position-relative justify-content-between button-container-2">
                    <div className="d-flex deny-button">
                        <div className="d-flex justify-content-center align-items-center">
                            <i className="fas fa-xl fa-times" style={{ color: "#f2757e" }} />
                        </div>
                    </div>
                    <div className="like-button">
                        <div>
                            <i className="fas fa-xl fa-heart" style={{ color: "#a65aec" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};