import React, { useEffect, useState, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

import 'swiper/css';
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
import { userImgs } from '../../../img/MainPage';

import Daniel from '../../../img/MainPage/Daniel.png';
import Becky from '../../../img/MainPage/Becky.png';
import Simon from '../../../img/MainPage/Simon.png';
import Maya from '../../../img/MainPage/Maya.png';
import James from '../../../img/MainPage/James.png';
import David from '../../../img/MainPage/David.png';
import Rebecca from '../../../img/MainPage/Rebecca.png';
import Liam from '../../../img/MainPage/Liam.png';

const userImgs2 = { Daniel, Becky, Simon, Maya, James, David, Rebecca, Liam };

import { authUser } from '../../auth/authUser';
import { getUser } from '../../auth/getUser';
import { Click } from '../Navbar';
import { Swipe } from './Swipe';
const remove = ['Amber', 'Basi', 'Michelle', 'Wesgolf'];

export const Match = () => {
    const [page, setPage] = useState(1);
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [swipe, setSwipe] = useState();
    const [swiping, setSwiping] = useState([]);
    const navigate = useNavigate();

    const initUser = async () => {
        const auth = await authUser();
        const email = auth?.email;

        if (email) {
            const user = await getUser(email);
            const users = (await fetchUsers(user)).filter(s => s.email != email && !remove.includes(s.email));

            setUser(user);
            setUsers([...users, users[0]]);
            setSwipe(users.slice(0, 2));
        } else {
            navigate('/loginpage');
        }
    };

    const fetchUsers = async (user) => {
        const data = await fetch("http://localhost:8000/api/auth/fetchallusers")
            .then(res => res.json());

        return data.users.filter(s => !user.likes.includes(s.email));
    };

    const shiftSwipe = () => {
        setUsers(users.slice(1));
        setSwipe(users.slice(1, 3));
    };

    useEffect(() => {
        initUser();
    }, []);

    return (
        !user ? '' :
            <>
                {swipe.map((s, i) => {
                    return (
                        <Swipe length={40} max={users.length} id={i} key={s.email} setSwipe={shiftSwipe}
                            setSwiping={setSwiping} email={s.email}
                        >

                            <div className="search-container position-absolute"
                                style={{ outline: (swiping[0] === s.email && '4px solid ' + swiping[2]) }}>
                                {users.length === 1 &&
                                    <div className="page-overlay position-absolute" style={{ borderRadius: '40px', background: 'rgba(0, 0, 0, .5)' }}>
                                        <div className="d-flex justify-content-center align-items-center" style={{ color: 'white', fontSize: '50px', height: '80%' }}>
                                            no more hoes :C
                                        </div>
                                    </div>
                                }

                                <Carousel
                                    key={s.email + s.age}
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

                                    {(s.name === 'Anna' && Object.values(userImgs[s.name]).map((s, i) => <div key={i + Math.random()}> <img className="no-image-select carousel" src={s.default}></img></div>))
                                        || (userImgs2[s.name] && <div key={s.name + Math.random()}> <img className="no-image-select carousel" src={userImgs2[s.name]}></img></div>)
                                        || images.map((s, i) => <div key={i + Math.random()}> <img className="no-image-select carousel" src={s}></img></div>)}
                                </Carousel>

                                <MatchCard swiping={swiping[1]} name={s.name} page={page} age={s.age} image={image} degree={s.degree} match={~~(70 + Math.random() * 20)} school={s.school} />

                                <div className="d-flex flex-column" style={{ padding: '40px', width: '100%', background: 'white' }}>
                                    <div className='user-bio'>
                                        <span style={{ color: '#454650', marginBottom: '10px' }}>About {s.name}</span>
                                        <div className="bio-desc">
                                            {s.bio}
                                        </div>

                                        <div className="bio-info-ctn d-flex">
                                            {s.about.map(s => <About key={s} about={s} userAbout={user.about} />)}
                                        </div>
                                    </div>


                                    <div className='fav-song'>
                                        <span style={{ color: '#454650', marginBottom: '10px' }}> Favourite Song </span>
                                        <Click redirect href={`https://open.spotify.com/track/${s.song.url}`}>
                                            <div className="d-flex">
                                                <img src={s.song.img} height="50px" style={{ marginRight: '5px' }} />
                                                <div className="song-info">
                                                    <div>{s.song.name}</div>
                                                    <div className='d-flex align-items-center'>
                                                        <img src={spotify} height="16px" />
                                                        <span style={{ marginLeft: '5px' }}> {s.song.artists}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Click>
                                    </div>

                                    <div className='user-passions'>
                                        <span style={{ color: '#454650', marginBottom: '10px' }}> Passions </span>
                                        <div className="passion-container d-flex">
                                            {s.passions.map(s => <Passion key={s} passion={s} passions={user.passions} />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Swipe>
                    );
                })}
            </>
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

    useEffect(() => {
        if (className.includes('m'))
            console.log(className, about);
    }, []);

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
    searching: (color) => <i className="fa-solid fa-heart" style={{ color }} />,
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