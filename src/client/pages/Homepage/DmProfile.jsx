import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DmProfile.scss';

import { socket } from './socket';

export const ProfileIcon = (props) => {
    const { icon } = props;

    return (
        <>
            <div className="user-icon-container d-flex align-items-center justify-content-center"
                style={{ backgroundImage: `url(${icon})`, backgroundSize: '40px' }}>
                {icon ? '' : <i className="fa-solid fa-user" />}
                {props.children}
            </div>
        </>
    );
};

export const DmProfile = ({ isOffline, setCurrentDm, iconOnly, data, icon, setDms }) => {
    const { name, dmStatus, email } = data;
    const [offline, setOffline] = useState(isOffline);
    const [typing, setTyping] = useState(false);
    const [lastMessage, setLastMessage] = useState(data.lastMessage?.message || '');
    const emails = [socket.email, email];
    const userTyping = typing ? 'typing' : 'sent';
    let timeout = null;

    const arrayEqual = (a1, a2) => {
        return new Set(a1.concat(a2)).size === a1.length;
    };

    useEffect(() => {
        if (iconOnly) return;

        socket.on('typing', data => {
            if (data.from === email && data.to === socket.email) {
                clearTimeout(timeout);
                timeout = setTimeout(() => setTyping(false), 3000);

                setTyping(true);
            }
        });

        socket.on('message', messageData => {
            if (messageData.from === email) {
                clearTimeout(timeout);
                setTyping(false);
            }

            if (arrayEqual(emails, [messageData.to, messageData.from])) {
                setLastMessage(messageData.message);
                setDms(data);
            }
        });

        socket.on('userpresence', data => {
            // set their status to online/offline
            if (data.email === email) {
                if (data.offline === true) {
                    setOffline(true);
                } else {
                    setOffline(false);
                }
            }
        });
    }, []);

    const changeDm = (event) => {
        event.preventDefault(); // stop page refresh on link click 
        setCurrentDm(data);
    };

    return (
        <a className="profile-click" href="" style={{ pointerEvents: iconOnly && 'none' }} onClick={changeDm}>
            <div className="profile-container d-flex align-items-center">
                {/* <ProfileIcon icon={icon}>
                    {offline && <div className="user-status-offline" />}
                </ProfileIcon> */}
                <div className="position-relative">
                    {icon}
                    {offline && <div className="user-status-offline" />}
                </div>
                <div className="name-message">
                    <div className="d-flex align-items-center">
                        <span className="profile-name">
                            {name}
                        </span>
                        <i className="fas fa-badge-check verified-badge" />
                        <div className={"justify-content-center align-items-center " + (dmStatus && !iconOnly ? 'dm-status' : "d-none")} >
                            {dmStatus}
                        </div>
                    </div>
                    {!iconOnly && <div className={userTyping + "-message"}>
                        {typing ? 'Typing...' : lastMessage}
                    </div>}
                </div>
            </div>
        </a>
    );
};