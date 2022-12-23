import React, { useEffect, useRef, useState } from 'react';
import './Swipe.scss';

export const Swipe = ({ children, email, id, length, max, setSwipe, setSwiping }) => {
    const [clicked, setClicked] = useState();
    const [direction, setDirection] = useState();
    const [finish, setFinished] = useState();
    const ref = useRef();

    const handleMouseDown = (event) => {
        setClicked(event.clientX);
    };

    const handleMouseMove = (event) => {
        if (clicked && !finish) {
            const clientX = event.clientX;
            const moveTo = clientX - clicked;
            const angle = ~~(moveTo / 15);

            if (moveTo >= 60) {
                setDirection('swipeRight');
                setSwiping([email, 'right', '#a65aec']);
            } else if (moveTo <= -60) {
                setDirection('swipeLeft');
                setSwiping([email, 'left', "#f2757e"]);
            } else {
                setDirection('');
                setSwiping([]);
            }

            ref.current.style.animation = '';
            ref.current.style.transformOrigin = 'center 330px';
            ref.current.style.transform = `translateX(${moveTo}px) rotate(${angle < 0 ? angle : 0}deg) `;
        }
    };

    const handleSwipe = (event) => {
        if (!direction) {
            //   console.log('animation reset here');
            ref.current.style.animation = '0.3s returnCard ease-in forwards';
            setClicked('');
        } else {
            ref.current.style.animation = `1s ${direction} ease-out forwards`;
            setClicked();
            setFinished(true);
        }
    };

    const events = {
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleSwipe,
        onMouseLeave: handleSwipe
    };

    return <div className="swipe-container position-absolute" ref={ref}
        onAnimationEnd={e => typeof clicked !== 'string' && setSwipe()}
        key={email} style={{ zIndex: length - id }}
        {...(id == 0 && id < max - 1 ? events : {})}>
        {children}
        <div className="d-flex position-relative justify-content-between button-container-2">
            <button className="deny-button">
                <div className="d-flex justify-content-center align-items-center" style={{ width: '24px' }}>
                    <i className="fas fa-xl fa-times deny-emoji" style={{ color: "#f2757e" }} />
                </div>
            </button>
            <button className="like-button">
                <div>
                    <i className="fas fa-xl fa-heart heart-emoji" style={{ color: "#a65aec" }} />
                </div>
            </button>
        </div>
    </div>;
};