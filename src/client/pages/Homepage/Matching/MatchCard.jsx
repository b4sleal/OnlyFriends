import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './MatchCard.scss';

export const MatchCard = ({ name, age, degree, page, verified, match, school }) => {
    const m = useState(match);

    return (
        <div className="match-card position-absolute">
            <div>
                <p className="small d-flex align-items-center"> <i className="fas fa-bolt" /> {m}% Match!</p>
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
                        <p className="small-2"> {school}</p>
                    </div>
                </div>

                <div className="name-age">
                    {name} {age}
                    {verified && <i className="fas fa-badge-check verified-badge" />}
                </div>

                <div className="user-program" style={{ marginBottom: '50px' }}>
                    <i className="fa-duotone fa-lg fa-graduation-cap" style={{ color: "#a65aec", marginRight: "5px" }}></i>
                    {degree}
                </div>
            </div>
        </div>
    );
};