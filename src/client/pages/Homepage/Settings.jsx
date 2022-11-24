import React, { useState, useEffect } from 'react';
import { authUser } from '../auth/authUser';
import { getUser } from '../auth/getUser';
import { Navbar } from './Navbar';
import { AsyncPaginate } from 'react-select-async-paginate';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import SpotifyWebApi from 'spotify-web-api-node';

// age, gender, school, program, interests, hobbies, uhhh star sign jk no.. hmmm
//pre determined hobbies list
const spotifyApi = new SpotifyWebApi({
    clientId: 'f76e2cc77a064692928a9e019f67af96',
    clientSecret: '2d82a3c9a3a84405b21dabd345a9b6fa',
    redirectUri: 'http://localhost:8000/spotify'
});

import './Settings.scss';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import spotify from '../../img/MainPage/spotify.svg';

export const SettingsPage = () => {
    const [tab, setTab] = useState("profile");
    const [user, setUser] = useState();
    const [profilePic, setProfilePic] = useState();
    const [currentPic, setCurrentPic] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [overlay, setOverlay] = useState();
    const [passionType, setPassionType] = useState("Creatives");
    const [song, setSong] = useState("");
    const [passions, setPassions] = useState();

    const upper = (str) => str.replace(/./, e => e.toUpperCase());
    const categories = ['Creatives', 'Food', 'Adventure', 'Sports', 'Media', 'Instruments', 'Going out'];
    const options = categories.reduce((prev, curr) => {
        const pass = allPassions[curr].map(s => ({ value: s, label: upper(s) }));

        return { [curr]: pass, ...prev };
    }, {});

    const animatedComponents = makeAnimated();

    const initUser = async () => {
        const auth = await authUser();
        const email = auth?.email;

        if (email) {
            const user = await getUser(email);

            setUser({ email, ...user });
            return user;
        } else {
            navigate('/loginpage');
        }
    };


    const handleTabClick = (clickedTab) => {
        if (clickedTab === "general") {
            if (tab === "profile") {
                setTab("general");
            }
        } else if (clickedTab === "profile") {
            if (tab === "general") {
                setTab("profile");
            }
        }

    };

    const handleProfilePicChange = (e) => {
        const file = new FileReader();
        file.readAsDataURL(e.target.files[0]);
        file.onload = () => {
            setProfilePic(file.result);
        };
    };

    const handleSubmit = async () => {
        setOverlay(false); //remove overlay!

        if (profilePic) {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: `images/${user.email}/profile.jpg`, data: profilePic })
            };

            const data = await fetch("http://localhost:8000/api/auth/profilepic", options)
                .then(res => res.json());

            if (data.error === "no email") {

            } else if (data.error === "error") {

            } else {
                setCurrentPic(profilePic);
            }
        }

        const filterObject = (obj) => Object.keys(obj).forEach(s => !obj[s] && delete obj[s]) || obj;


        const data = filterObject({
            name,
            password,
            passions,
            song,
            email: user.email
        });

        if (Object.keys(data).length > 1) {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };

            fetch("http://localhost:8000/api/auth/edituser", options);

            setSong();
            setPassword();
        }
    };

    useEffect(() => {
        initUser().then(user => {

            const queryOptions = new URLSearchParams({
                path: `images/${user.email}/profile.jpg`
            });

            fetch("http://localhost:8000/api/auth/getpic?" + queryOptions)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setCurrentPic(data.url);
                    }
                });
        });
    }, []);

    const loadOptions = async (input) => {
        if (!input) return { options: [] };
        const queryOptions = new URLSearchParams({
            email: user.email
        });

        const { token } = await fetch('http://localhost:8000/api/auth/spotify?' + queryOptions)
            .then(r => r.json());

        spotifyApi.setAccessToken(token);
        const tracks = await spotifyApi.searchTracks(input, { limit: 5 });
        const data = searchTracks(tracks);

        return { options: data };
    };

    return (
        !user ? '' :
            <div className="d-flex home-container flex-column">
                <Navbar page={3} />
                <div className='settings-main-container'>

                    {!overlay ? '' :
                        <div className='d-flex position-absolute page-overlay'>
                            <div className="overlay-message d-flex flex-column justify-content-center align-items-center">
                                <div>
                                    Sure?
                                </div>
                                <div className='d-flex justify-content-around align-items-center' style={{ width: '100%' }}>
                                    <button className="overlay-button" onClick={e => handleSubmit()}>Oui</button>
                                    <button className="overlay-button" onClick={e => setOverlay(false) || setProfilePic()}>Non</button>
                                </div>

                            </div>
                        </div>}
                    <div className='col-left'>
                        <img className="profile-pic" src={profilePic || currentPic || "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} alt="profile pic" />
                        <div className={`tab ${tab === "general" ? "active" : ""}`} onClick={e => handleTabClick("general")}>General</div>
                        <div className={`tab ${tab === "profile" ? "active" : ""}`} onClick={e => handleTabClick("profile")}>Profile</div>
                    </div>

                    <div className='col-right'>
                        {tab === "profile" &&
                            (<div className='input-main-container'>
                                <div className='input-container'>
                                    <div className="input-title">Profile Picture</div>
                                    <input type="file" onChange={handleProfilePicChange} />
                                </div>
                                <div className='input-container'>
                                    <div className="input-title">Name</div>
                                    <input type="file" onChange={e => setName(e.target.value)} />
                                </div>
                                <div className='input-container'>
                                    <div className="input-title">Passions</div>
                                    <div className="passion-ctn d-flex">
                                        {categories.map((category, i) =>
                                            <Click key={category} onClick={e => setPassionType(category)}>
                                                <div className={"passion" + (category === passionType ? '-select' : '')}>{category}</div>
                                            </Click>)}
                                    </div>
                                    <Select
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: state.isFocused ? "#a65aec" : "#808080",
                                                "&:hover": {
                                                    borderColor: "#a65aec"
                                                },
                                                borderRadius: "15px",
                                                borderWidth: "2px",
                                            })
                                        }}


                                        onChange={(selected) => { setPassions(selected.map(s => s.value)); }}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={options[passionType]}
                                        defaultValue={user.passions.map(s => ({ value: s, label: upper(s) }))}
                                    />
                                </div>

                                <div className='input-container d-flex flex-column'>
                                    <div>
                                        <div className="input-title">Favourite Song</div>
                                    </div>
                                    <AsyncPaginate
                                        key={user.email}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: state.isFocused ? "#a65aec" : "#808080",
                                                "&:hover": {
                                                    borderColor: "#a65aec"
                                                },
                                                borderRadius: "15px",
                                                borderWidth: "2px"
                                            })
                                        }}

                                        noOptionsMessage={({ inputValue }) => song ? 'Click X to clear' : inputValue ? 'No songs found' : "Enter a song name"}
                                        isSearchable
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        loadOptions={loadOptions}
                                        debounceTimeout={2000}
                                        isClearable
                                        onChange={(data) => setSong(data?.value)}
                                    />
                                </div>

                                <button className="submit-button" onClick={e => setOverlay(true)}>Submit</button>
                            </div>)}

                        {tab === "general" &&
                            (<div className='input-main-container'>
                                <div className='input-container'>
                                    <div className="input-title">Password</div>
                                    <input className="input" value={password} type="text" placeholder='Password' onChange={e => setPassword(e.target.value)} />
                                </div>
                                <button className="submit-button" onClick={handleSubmit}>Save</button>
                            </div>)}
                    </div>
                </div>
            </div>
    );
};

const searchTracks = (s) => {
    return s.body.tracks.items.reduce((prev, curr) => {
        const song = {
            name: curr.name,
            artists: curr.artists.map(s => s.name).join(', '),
            url: curr.id,
            img: curr.album.images[0].url,
        };

        return [...prev, {
            value: song,
            label: (
                <>
                    <div className='d-flex'>
                        <img src={song.img} height="40px" style={{ marginTop: '3px' }} />
                        <div className='d-flex flex-column' style={{ marginLeft: '5px' }}>
                            <div>{song.name}</div>
                            <div className='d-flex align-items-center'>
                                <img src={spotify} height="16px" style={{ marginRight: '3px' }} />
                                <span style={{ fontSize: '13px' }}> {song.artists}</span>
                            </div>
                        </div>

                    </div>
                </>
            )
        }];
    }, []);
};

const Click = ({ children, onClick, href = "", className = "", style }) => {
    const handleClick = (event) => {
        event.preventDefault();
        onClick && onClick(event);
    };

    return (
        <>
            <a style={style} className={className + " text-decoration-none"} onClick={handleClick} href={href}>
                {children}
            </a>
        </>
    );
};

const allPassions = {
    //Creatives
    Creatives: ['Baking',
        'Painting',
        'Sculpting',
        'Drawing',
        'Cooking',
        'Fashion'
    ],

    //Food
    Food: ['Japanese',
        'Chinese',
        'Middle-Eastern',
        'Greek',
        'Korean',
        'Indian',
        'Italian',
        'Jamacian',
        'Mexican',
        'Spanish',
        'Fruits',
        'Dessert',
        'French',
        'Mediterranean',
        'Lebanese',
        'Moroccan',
        'Thai'
    ],

    //Adventure
    Adventure: ['Travelling',
        'Hiking',
        'Rock Climbing',
        'Camping'
    ],

    //Sports
    Sports: ['Weight Lifting',
        'Hockey',
        'Basketball',
        'Baseball',
        'Boxing',
        'Tennis',
        'Badminton',
        'Fencing',
        'Soccer',
        'Table Tennis',
        'Swimming',
        'Volleyball',
        'Golf',
        'Boxing',
        'Running',
        'Snowboarding',
        'Ice-Skating',
        'Rugby'
    ],

    // Media
    Media: ['TV Shows',
        'Movies',
        'Horror Movies',
        'Marvel',
        'K-Pop',
        'Disney',
        'Netflix',
        'Podcasts',
        'Anime',
        'Manga',
        'K-Drama'
    ],

    //Instruments
    Instruments: ['Drums',
        'Piano',
        'Guitar',
        'Violin',
        'Cello',
        'Trumpet',
        'Saxophone',
        'Clarenet',
        'Flute'
    ],

    //Going Out
    'Going out': ['Drinking',
        'Karaoke',
        'Smoking',
        'Museum',
        'Art Gallery',
        'Clubbing',
        'Festivals',
        'Concerts'
    ]
};