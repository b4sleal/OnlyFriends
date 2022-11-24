import React, { useEffect, useState, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Match.scss';

import { MatchCard } from './MatchCard';

import image from '../../../img/MainPage/match_image.png';
import image2 from '../../../img/MainPage/match_image2.png';
import image3 from '../../../img/MainPage/match_image3.png';
import image4 from '../../../img/MainPage/match_image4.png';
import spotify from '../../../img/MainPage/spotify.svg';
const images = [image, image2, image3, image4];

import { Navbar } from '../Navbar.jsx';
import { authUser } from '../../auth/authUser';
import { getUser } from '../../auth/getUser';
import { Click } from '../Navbar';

export const Match = () => {
    const [page, setPage] = useState(1);
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [firstUser, setFirst] = useState();
    const [overlay, setOverlay] = useState();
    const [popupEmoji, setPopupEmoji] = useState();
    const navigate = useNavigate();

    const initUser = async () => {
        const auth = await authUser();
        const email = auth?.email;

        if (email) {
            const user = await getUser(email);
            const users = (await fetchUsers(user)).filter(s => s.email != email);

            setUser(user);
            setFirst(users[0]);
            setUsers([...users, users[0]]);
        } else {
            navigate('/loginpage');
        }
    };

    const fetchUsers = async (user) => {
        const data = await fetch("http://localhost:8000/api/auth/fetchallusers")
            .then(res => res.json());

        return data.users.filter(s => !user.likes.includes(s.email));
    };

    useEffect(() => {
        initUser();
    }, []);

    return (
        <div className="match-main-container">
            <Navbar page={1} />
            <div className="search-container d-flex position-relative">
                {users.length === 1 &&
                    <div className="page-overlay position-absolute" style={{ borderRadius: '40px', background: 'rgba(0, 0, 0, .5)' }}>
                        <div className="d-flex justify-content-center align-items-center" style={{ color: 'white', fontSize: '50px', height: '80%' }}>
                            no more hoes :C
                        </div>
                    </div>
                }

                {!firstUser ? '' :
                    <>
                        {overlay && <div className="page-overlay position-absolute" style={{ borderRadius: '40px' }} />}
                        <Carousel
                            key={users[0].email}
                            showThumbs={false} showStatus={false} showArrows={true}
                            transitionTime={0} useKeyboardArrows={true} width="420px"
                            renderArrowPrev={(click) =>
                                <button type="button" aria-label="next slide / item" style={{ display: page == 1 && 'none' }}
                                    onClick={e => setPage(page - 1) || click()} className="control-arrow control-prev">
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>
                            }
                            renderArrowNext={(click) =>
                                <button type="button" aria-label="next slide / item" style={{ display: page == 4 && 'none' }}
                                    onClick={e => setPage(page + 1) || click()} className="control-arrow control-next">
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            }

                            selectedItem={0}
                            renderIndicator={() => null}
                        >
                            {images.map((s, i) => <div key={i + Math.random()}> <img className="no-image-select carousel" src={s}></img></div>)}
                        </Carousel>

                        <MatchCard name={users[0].name} page={page} age={users[0].age} image={image} degree={users[0].degree} setOverlay={setOverlay} setPopupEmoji={setPopupEmoji} />

                        <div className="position-absolute" style={{ left: '385px', top: '310px' }}>
                            <i className={"fas fa-xl fa-heart heart-emoji position-absolute popup-emoji" + (popupEmoji === 'like' ? '' : '-2')}
                                onAnimationEnd={e => {
                                    setPopupEmoji(false);
                                    setOverlay(false);
                                    setUsers(users.slice(1));
                                    setPage(1);
                                }}
                                style={{
                                    color: "#BE77FF",
                                    transformOrigin: 'center',
                                    fontSize: '70px'
                                }} />
                        </div>

                        <div className="position-absolute" style={{ left: '395px', top: '310px' }}>
                            <i className={"fas fa-xl fa-times deny-emoji position-absolute popup-emoji-deny" + (popupEmoji === 'deny' ? '' : '-2')}
                                onAnimationEnd={e => {
                                    setPopupEmoji(false);
                                    setOverlay(false);
                                    setUsers(users.slice(1));
                                    setPage(1);
                                }}
                                style={{
                                    transformOrigin: 'center center',
                                    fontSize: '70px'
                                }} />
                        </div>

                        <div className="d-flex flex-column" style={{ padding: '40px', width: '100%' }}>
                            <div className='user-bio'>
                                <span style={{ color: '#454650', marginBottom: '10px' }}>About {users[0].name}</span>
                                <div className="bio-desc">
                                    {users[0].bio}
                                </div>

                                <div className="bio-info-ctn d-flex">
                                    {users[0].about.map(s => <About key={s} about={s} userAbout={user.about} />)}
                                </div>
                            </div>


                            <div className='fav-song'>
                                <span style={{ color: '#454650', marginBottom: '10px' }}> Favourite Song </span>
                                <Click redirect href={`https://open.spotify.com/track/${users[0].song.url}`}>
                                    <div className="d-flex">
                                        <img src={users[0].song.img} height="50px" style={{ marginRight: '5px' }} />
                                        <div className="song-info">
                                            <div>{users[0].song.name}</div>
                                            <div className='d-flex align-items-center'>
                                                <img src={spotify} height="16px" />
                                                <span style={{ marginLeft: '5px' }}> {users[0].song.artists}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Click>
                            </div>

                            <div className='user-passions'>
                                <span style={{ color: '#454650', marginBottom: '10px' }}> Passions </span>
                                <div className="passion-container d-flex">
                                    {users[0].passions.map(s => <Passion key={s} passion={s} passions={user.passions} />)}
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div >
    );
};

const About = ({ about, userAbout }) => {
    const [className, setClass] = useState('bio-info');
    const searchTypes = ['Looking for friends', 'Looking for relationship', 'Looking for anything'];
    const userSearching = userAbout.find(s => searchTypes.includes(s));

    if (!className.includes('match'))
        if (userSearching && searchTypes.includes(about)) {
            if (userSearching.includes('anything')) {
                setClass(className + '-match');
            } else if (about === userSearching) {
                setClass(className + '-match');
            }
        } else if (userAbout.includes(about)) {
            setClass(className + '-match');
        }

    return (
        <div className={className}>
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