import React, { useState, useRef, useEffect } from 'react';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './MatchCard.scss';

export const MatchCard = ({ name, age, degree, style, page, setOverlay, setPopupEmoji }) => {
    return (
        <>
            <div className="match-card position-absolute">
                <div>
                    <p className="small d-flex align-items-center"> <i className="fas fa-bolt" /> 50% Match!</p>
                </div>

                <div className="image-overlay" />
                <div className="image-scroll-ctn d-flex">
                    {new Array(4).fill(0).map((s, i) =>
                        <div key={page + i} className={"image-scroll-bar" + (page === (i + 1) ? '' : '-2')} />
                    )}
                </div>

                <div className="position-absolute user-info-container">
                    <div className="user-nearby-container">
                        <div className="user-nearby">
                            <p className="small-2"> Looking for friends</p>
                        </div>
                    </div>

                    <div className="name-age">
                        {name} {age}
                        <i className="fas fa-badge-check verified-badge" />
                    </div>

                    <div className="user-program">
                        <i className="fa-duotone fa-lg fa-graduation-cap" style={{ color: "#a65aec", marginRight: "5px" }}></i>
                        {degree}
                    </div>

                    <div className="d-flex position-relative justify-content-between button-container-2">
                        <button className="deny-button" onClick={e => setPopupEmoji("deny") || setOverlay(true)}>
                            <div className="d-flex justify-content-center align-items-center" style={{ width: '24px' }}>
                                <i className="fas fa-xl fa-times deny-emoji" style={{ color: "#f2757e" }} />
                            </div>
                        </button>
                        <button className="like-button" onClick={e => setPopupEmoji("like") || setOverlay(true)}>
                            <div>
                                <i className="fas fa-xl fa-heart heart-emoji" style={{ color: "#a65aec" }} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};