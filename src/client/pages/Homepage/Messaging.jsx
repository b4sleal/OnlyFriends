import React, { useEffect, useState, useReducer } from 'react';

import { useNavigate } from 'react-router-dom';
import { authUser } from '../auth/authUser';
import { getUser } from '../auth/getUser';
import { DmProfile } from './DmProfile';
import { DmChat } from './DmChat';
import { socket } from './socket';
import { Matches } from './Matches';
import { Navbar } from './Navbar';
import { ScrollBar } from './ScrollBar';
import Avatar, { genConfig } from 'react-nice-avatar';
import "./Messaging.scss";

import spotify from '../../img/MainPage/spotify.svg';

export const Messaging = () => {
    const navigate = useNavigate();

    // Organize latest dms to top, save avatars
    const reducer = (state, action) => action.remove ? state.filter(action.fn) : action.some ? action : Array.from(new Set([action, ...state]));
    const reducerFunc = (state, action) => ({ ...state, ...action });

    const [dms, setDms] = useReducer(reducer, []);
    const [matches, setMatches] = useState([]);
    const [currentDm, setCurrentDm] = useState();
    const [onlineUsers, setOnlineUsers] = useState();
    const [avatars, setAvatar] = useReducer(reducerFunc, {});
    const [user, setUser] = useState();

    const initUser = async () => {
        const auth = await authUser();
        const email = auth?.email;

        if (email) {
            const { users, matches } = await getUserDms(email);
            const func = (s) =>
                setAvatar({
                    [s.email]:
                        <Avatar key={s.email + 'sss'} style={{ width: '60px', height: '60px' }}
                            {...genConfig({ sex: s.gender === 'Male' ? 'man' : 'woman', bgColor: randHex() })}
                        />
                });

            users.forEach(func);
            matches.forEach(func);
            socket.email = email;

            setUser(await getUser(email));
            setDms(sortDms(users));
            setMatches(matches);
            setCurrentDm(users[0]); //On load, show the dm that theyve last sent
        } else {
            navigate('/loginpage');
        }

    };

    const getUserDms = async (email) => {
        // Request the ppl that are in dis mans dms
        const queryOptions = new URLSearchParams({ email });
        const data = await fetch("http://localhost:8000/api/auth/getusers?" + queryOptions)
            .then(res => res.json());

        return data;
    };

    const sortDms = dms => {
        dms.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
        return dms;
    };

    const removeDm = () => {
        const shortend = dms.filter(el => el.email !== currentDm.email);
        const queryOptions = new URLSearchParams({
            user: currentDm.email,
            email: socket.email
        });

        setDms(shortend);
        setCurrentDm(shortend[0]);

        fetch('http://localhost:8000/api/auth/unmatchuser?' + queryOptions)
            .then(r => r.json());
    };

    useEffect(() => {
        initUser().then(() => {
            // tell the backend to make this socket id the users email as a reference
            socket.emit('userlogin', { id: socket.id, email: socket.email });
        });

        socket.on('users', data => {
            setOnlineUsers(data);
        });
    }, []);

    return (
        <div className="d-flex mess-home-container flex-column">
            <Navbar page={2} />
            <div className='d-flex' style={{ height: '100%' }}>
                <div className="dm-container d-flex flex-column">
                    <div className="matches-title">
                        New Matches
                        <span className="title-extra"> ({matches.length}) </span>
                    </div>

                    <div style={{ height: '160px' }}>
                        <ScrollBar type={"horiz"} className="d-flex">
                            {matches.map(s => <Matches key={s.email + 'somerandomness'} name={s.name} gender={s.gender} icon={avatars[s.email]} />)}
                        </ScrollBar>
                    </div>
                    <div className="matches-title">
                        Conversations
                        <span className="title-extra"> (Recent) </span>
                    </div>
                    <ScrollBar type="vert">
                        {(onlineUsers && dms.length) ?
                            dms.map(s =>
                                <DmProfile isOffline={!onlineUsers.includes(s.email)} setDms={setDms} icon={avatars[s.email]}
                                    setCurrentDm={setCurrentDm} key={s.email + 'somerandomness'} data={s}
                                />) : ''}
                    </ScrollBar>
                </div>

                <div className="chat-container position-relative d-flex flex-column justify-content-end">
                    <div className="d-flex justify-content-between user-profile">
                        {currentDm && <DmProfile iconOnly data={currentDm} icon={avatars[currentDm.email]} />}
                    </div>

                    {currentDm && <DmChat setDms={setDms} currentDm={currentDm} />}
                </div>

                <div className="profile-info-container" >
                    {!currentDm ? '' :
                        <div className="d-flex flex-column" style={{ padding: '40px' }}>
                            <div className='user-bio'>
                                <span style={{ color: '#454650', marginBottom: '10px' }}>About {currentDm.name}</span>
                                <div className="bio-desc">
                                    {currentDm.bio}
                                </div>
                                <div className="bio-info-ctn d-flex">
                                    {currentDm.about.map(s => <About key={s} about={s} userAbout={user.about} />)}
                                </div>
                            </div>
                            <div className='fav-song'>
                                <span style={{ color: '#454650', marginBottom: '10px' }}> Favourite Song </span>
                                <div className="d-flex">
                                    <img src={currentDm.song.img} height="50px" style={{ marginRight: '5px' }} />
                                    <div className="song-info">
                                        <div>{currentDm.song.name}</div>
                                        <div className='d-flex align-items-center'>
                                            <img src={spotify} height="16px" />
                                            <span style={{ marginLeft: '5px' }}> {currentDm.song.artists}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='user-passions'>
                                <span style={{ color: '#454650', marginBottom: '10px' }}> Passions </span>
                                <div className="passion-container d-flex">
                                    {currentDm.passions.map(s => <Passion key={s} passion={s} passions={user.passions} />)}
                                </div>
                            </div>
                            <button
                                className="unmatch-button"
                                onClick={removeDm}
                            >Unmatch</button>
                        </div>

                    }
                </div>
            </div>
        </div>
    );
};



//dangit! lets fix it 
//that should be good, go test it out no emojis next to text yes 
const About = ({ about, userAbout }) => {
    return (
        <div className={'bio-info' + (userAbout.includes(about) ? '-match' : '')}>
            {bioEmojis[about]} {about}
        </div>
    );
};


const Passion = ({ passion, passions }) => {
    return (
        <div className={'passion' + (passions.includes(passion) ? '-match' : '')}>
            {passion}
        </div>
    );
};

const bioImages = {
    sign: <i className="fa-solid fa-moon-stars" />,
    searching: (color) => <i class="fa-solid fa-heart" style={{ color }} />,
    pet: <i className="fa-solid fa-paw" />,
    height: <i className="fa-solid fa-ruler" style={{ transform: 'scale(0.9)' }} />,
    license: <i className="fa-solid fa-id-card" />,
    sex: <i className="fa-solid fa-venus-mars" />
};

const nums = [4, 5, 6];
const heights = nums.map(s => new Array(11).fill().map((_, e) => s + "'" + (e + 1))).flat()
    .reduce((prev, curr) => {

        return { ...prev, [curr]: bioImages.height };
    }, {});

const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    .reduce((prev, curr) => {

        return { ...prev, [curr]: bioImages.sign };
    }, {});

const pets = ['Cat', 'Dog', 'Bird', 'Fish', 'Turtle', 'Ferret', 'Snake', 'Hamster', 'Flying Squirrel', 'Rabbit']
    .reduce((prev, curr) => {

        return { ...prev, [curr]: bioImages.pet };
    }, {});

const sexys = ['Straight', 'Gay', 'Lesbian', 'Pansexual', 'Bisexual', 'Asexual', 'Queer', 'Demisexual', 'Aromantic', 'Demisexual', 'Gynesexual', 'Androsexual', 'Polyamorous', 'Skoliosexual']
    .reduce((prev, curr) => {

        return { ...prev, [curr]: bioImages.sex };
    }, {});

const colors = ['#ffc457', '#f00025', '#89CFF0']; //very cute! 
const searching = ['Looking for friends', 'Looking for relationship', 'Looking for anything']
    .reduce((prev, curr, i) => {

        return { ...prev, [curr]: bioImages.searching(colors[i]) };
    }, {});

const bioEmojis = {
    ...heights,
    ...zodiacSigns,
    ...pets,
    ...sexys,
    ...searching
};

/* 
<div className='bio-info'><i className="fa-solid fa-moon-stars" ></i> Capricorn</div>
<div className='bio-info'><i className="fa-solid fa-user-group" style={{ transform: 'scale(0.7)' }}></i> Looking for Friends</div>
<div className='bio-info-match'><i className="fa-solid fa-paw"></i> Dog</div>
<div className='bio-info-match'><i className="fa-solid fa-ruler" style={{ transform: 'scale(0.9)' }}></i> 5'6</div>
<div className='bio-info-match position-relative'><i className="fa-solid fa-id-card"></i> License</div>
<div className='bio-info'><i className="fa-solid fa-venus-mars"></i> Straight</div>



/**
<ProfileDM offline name="Amber Turn" dmStatus="New" lastMessage={"ok yeah i guess u right"} />

<ProfileDM name="John David" lastMessage={"no fr thats crazy"} />

<ProfileDM name="Johhny S." icon={image} lastMessage={"what the hell are you talking about"} />

<ProfileDM icon="https://i.pinimg.com/originals/63/b9/be/63b9be5c668762bbacf0d8ffa7a70c75.jpg"
    offline={true} name="Jacky Chan" dmStatus="2" lastMessage={"What do you think?"} />
 */
const randHex = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
