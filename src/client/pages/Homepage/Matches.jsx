import React, { useEffect, useState, useReducer } from 'react';
//import { ProfileIcon } from './DmProfile';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Matches.scss";

export const Matches = ({ name, icon }) => {
    return (
        <div className="match-profile-container d-flex flex-row align-items-center profile-match-holder">
            <div className="d-flex flex-column align-items-center" style={{ width: '80px' }}>
                {/* <ProfileIcon /> */}
                {icon}
                <div className="name-message">
                    <div className="d-flex align-items-center">
                        <span className="profile-name profile-match-name">
                            {name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
