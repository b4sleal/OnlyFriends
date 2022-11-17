import React, { useEffect, useState, useReducer, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { socket } from './socket';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DmChat.scss';
import { ScrollBar } from './ScrollBar.jsx';

export const DmChat = ({ currentDm }) => {
    const message = useRef();
    const reducer = (state, action) => action.set || [...state, ...action];
    const [messages, setMessages] = useReducer(reducer, []);
    const [emojiPicker, setEmojiPicker] = useState(false);
    const ref = useRef();

    const initDms = async ({ reset } = {}) => { // Get messages between the 2 users
        const queryOptions = new URLSearchParams({
            email: socket.email,
            user: currentDm.email
        });

        const data = await fetch("http://localhost:8000/api/auth/getmessages?" + queryOptions)
            .then(res => res.json());

        if (data) { //not having set will merge, having set will overwrite
            setMessages(reset ? { set: data.dms } : data.dms);
        };
    };

    const emojiPopup = (event) => {
        event.preventDefault(); //prevent page reload on click
        setEmojiPicker(!emojiPicker);
        onEmojiClick();
    };

    const emojiClick = ({ emoji }, event) => {
        setMsg(message + ' ' + emoji); //lets see if it worked
    };

    const sendMessage = async (event) => {
        event.preventDefault(); // stop page refresh on link click
        const data = { from: socket.email, to: currentDm.email, message };

        setMsg(''); // set message input to nothing after sent
        socket.emit('message', data); // send message to backend, to send to user
    };

    const handleTyping = (event) => {
        if (message) { //if they havent typed anything, dont send the message           
            if (event.key === "Enter") { //enter = they sent a message
                sendMessage(event);
            } else {
                //if they dont type enter, let the other person know theyre typing
                socket.emit('typing', { from: socket.email, to: currentDm.email });
            }
        }
    };

    useEffect(() => {
        initDms();

        // Listener to show messages llive
        socket.on('message', data => {
            setMessages([{ from: data.from, message: data.message }]);
        });
    }, []);

    // If they switch DMS, then reset the dm chat
    useEffect(() => {
        initDms({ reset: true });
    }, [currentDm]);

    // Automatically scroll to bottom of chat
    useEffect(() => {
        ref.current.scrollIntoView();
    }, [messages]);

    useEffect(() => {
        console.log('Rendered !');
    });

    return (
        <>
            <ScrollBar>
                {messages.map((s, i) =>
                    <Message key={Math.random()}
                        type={s.from === socket.email ? 'right' : 'left'}
                    >
                        {s.message}
                    </Message>
                )}

                <div ref={ref} />
            </ScrollBar>

            <div className="emoji-picker" style={{ display: emojiPicker ? 'block' : 'none' }}>
                <EmojiPicker emojiStyle='twitter' onEmojiClick={emojiClick} />
            </div>

            <div className="send-message-ctn position-relative d-flex align-items-center">
                <MessageInput ref={message} onKeyPress={handleTyping} update={r => message.current = r}></MessageInput>

                <label className="message-label">
                    <div className="message-label-cover"></div>
                    Send Message
                </label>

                <a className="emoji-button" href="" onClick={emojiPopup}>
                    <i className="fa-regular fa-face-smile"></i>
                </a>

                <a className="send-button" href="" onClick={sendMessage}
                    style={{ pointerEvents: !!message ? 'all' : 'none' }}>
                    <i className="fa-solid fa-paper-plane-top" />
                </a>
            </div>
        </>
    );
};

const Message = (props) => {
    return (
        <div className={`sent-message-container-${props.type}`}>
            {props.children}
        </div>
    );
};

const MessageInput = ({ update, onKeyPress }) => {
    const [message, setMsg] = useState('');

    return (
        <>
            <input onKeyPress={onKeyPress} className="message-box" required
                value={message}
                onChange={event => setMsg(event.target.value) && update(event.target.value)}
            />
        </>
    );
};