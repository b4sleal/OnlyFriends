import React from 'react';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './ProfileImage.scss';
//import { faBolt, faTimes, faHeart, } from '@fortawesome/free-solid-svg-icons';

export const ProfileImage = (props) => {
    return (
        <div>
            <div>
                <p className="small"> <i className="fas fa-bolt" color="white" /> 50% Match!</p>
            </div>
            <img className="match-image" src={props.image} width={350} height={550} />

            <div className="image-overlay" />

            <div className="image-scroll-ctn">
                <div className="image-scroll-bar" />
                <div className="image-scroll-bar-2" />
                <div className="image-scroll-bar-2" />
                <div className="image-scroll-bar-2" />
            </div>

            <div className="button-container-2">
                <div className="d-flex deny-button">
                    <div className="d-flex justify-content-center align-items-center" style={{ width: '28px', position: 'none' }}>
                        <i className="fas fa-xl fa-times" style={{ color: "green" }} />
                    </div>
                </div>
                <div className="like-button">
                    <div>
                        <i className="fas fa-xl fa-heart" style={{ color: "green" }} />
                    </div>
                </div>
            </div>

            <div className="user-nearby-container">
                <div className="user-nearby">
                    <p className="small-2"> Nearby to you</p>
                </div>
            </div>
            <div className="name-age d-flex">
                Jennifer, 22
                <i className="fas fa-badge-check verified-badge" />
            </div>
        </div>
    );
};