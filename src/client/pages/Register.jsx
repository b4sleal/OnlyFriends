import { Navigate, redirect, useNavigate } from 'react-router-dom';
import React, { useState, useReducer, useEffect } from 'react';
import { authUser } from './auth/authUser';

import {
    Button,
    ButtonContainer,
    Input,
    InputError,
    CardHolder,
    Title
} from './components/RegisterComponents';
import './Register.scss';

// Spotify api tingz
import SpotifyWebApi from 'spotify-web-api-node';


export const Register = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [emojis, setEmojis] = useState('');
    const [loaded, loadPage] = useState();

    // Storage for the users info
    const reducerFunc = (state, action) => ({ ...state, ...action });
    const [name, setName] = useReducer(reducerFunc, { value: '', errorMsg: '' });
    const [age, setAge] = useReducer(reducerFunc, { value: '', errorMsg: '' });
    const [gender, setGender] = useReducer(reducerFunc, { value: '', errorMsg: '' });
    const [email, setEmail] = useReducer(reducerFunc, { value: '', errorMsg: '' });
    const [password, setPassword] = useReducer(reducerFunc, { value: '', errorMsg: '' });
    const [code, setCode] = useReducer(reducerFunc, { value: '', message: '' });

    // Validate email address
    //const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(mylaurier|uwaterloo|utoronto|queensu)\.ca$/;
    const emailRegex = /^.+@\w+\.c(a|om)$/;

    // Handle clicking next button
    const nextPage = async (event) => {

        setEmojis('');

        //Verify inputs before going to the next page
        if (page == 1) {
            if (!name.value) {
                return setName({ errorMsg: 'Enter your name' });
            }

        } else if (page == 2) {
            if (!age.value) {
                return setAge({ errorMsg: 'Enter your age' });
            }

        } else if (page == 3) {
            if (!gender.value) {
                return setGender({ errorMsg: 'Select a gender' });
            }

            // const col = doc(db, 'Users', name.value);
            // const document = await getDoc(col);
        } else if (page == 4) {
            const passError = handlePassword(password.value);

            // Verify their email and password
            if (!emailRegex.test(email.value)) {
                return setEmail({ errorMsg: 'Enter a valid school email' });
            }

            if (!password.value) {
                return setPassword({ errorMsg: 'Enter a password' });
            }

            if (passError) {
                return setPassword({ errorMsg: passError });
            }

            // Check if they sent the verification code
            if (!code.value) {
                return setCode({ message: 'Verify your email' });
            }

            // here is the start of front end to backend communication o
            //first, we have to setup what we want to send to the backend

            // Options for the request
            const reqOptions = {
                method: 'POST', //post means we want to save data
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.value,
                    age: age.value,
                    gender: gender.value,
                    email: email.value,
                    password: password.value,
                    code: code.value
                })
            };

            // here we make a request to the endpoint api/auth/register 
            // Make request to backend to register user
            const data = await fetch('http://localhost:8000/api/auth/register', reqOptions)
                .then(res => res.json()); // this is to make the data thats returned into an object

            if (!data || data.error == 'no code') {
                return setCode({ message: 'Send verification' });
            } else if (data.error == 'wrong code') {
                return setCode({ message: 'Wrong code' });
            }

            // Error check: if the account already exists
            if (data.error == 'exists') {
                return setEmail({ errorMsg: 'Account already exists' });
            } else {
                // Store the token/data and navigate after they registered
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/home');
            }
        }

        setPage(page + 1);
    };

    // Handle clicking back button
    const backPage = () => {
        // If they go back TOO FAR then reutrn home
        if (page == 1) {
            navigate('/');
        }

        setEmojis('');
        setPage(page - 1);
    };

    const sendEmail = async () => {
        if (!emailRegex.test(email.value)) {
            return setCode({ message: 'Enter a valid school email' });
        }

        // Options for the request
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value })
        };

        // Make request to backend to register user
        const data = await fetch('http://localhost:8000/api/auth/verifyemail', reqOptions)
            .then(res => res.json());

        if (!data || data.error === 'exists') {
            setCode({ message: 'Account already exists' });
        } else if (data.error === 'limit') {
            setCode({ message: 'Try again in 2 minutes' });
        } else {
            setCode({ message: 'Email sent!' });
        }
    };

    // Enter their name
    const page1 = (
        <CardHolder>
            <Title>Lets hear about yourself</Title>
            <Input
                value={name.value} error={name.errorMsg} maxLength={16}
                onChange={e => setName({ value: e.target.value, errorMsg: '' })}
                onClick={nextPage}
            >
                Your Name
            </Input>
            <InputError>{name.errorMsg}</InputError>
            <ButtonContainer>
                <Button type="1" onClick={backPage}>Back</Button>
                <Button type="2" onClick={nextPage}>Next</Button>
            </ButtonContainer>
        </CardHolder>
    );

    // Enter their age
    const page2 = (
        <CardHolder>
            <Title>Can you consent</Title>
            <Input
                value={age.value} error={age.errorMsg} valid="number" maxLength={2}
                onChange={e => setAge({ value: e.target.value, errorMsg: '' })}
                onClick={nextPage}
            >
                Age
            </Input>
            <InputError>{age.errorMsg}</InputError>
            <ButtonContainer>
                <Button type="1" onClick={backPage}>Back</Button>
                <Button type="2" onClick={nextPage}>Next</Button>
            </ButtonContainer>
        </CardHolder>
    );

    // Enter their gender
    const page3 = (
        <CardHolder>
            <Title>what are thou pronouns</Title>
            <ButtonContainer className="d-block">
                <Button
                    type={gender.value == "male" ? "selected" : "select"}
                    onClick={e => setGender({ value: 'male', errorMsg: '' })}
                >
                    Male
                </Button>
                <Button
                    type={gender.value == "female" ? "selected" : "select"}
                    className='position-relative'
                    onClick={e => handleEmojiPopup(setEmojis) && setGender({ value: 'female', errorMsg: '' })}
                    popupEmoji="true"
                >
                    Female
                    {emojis}
                </Button>
            </ButtonContainer>
            <InputError>{gender.errorMsg}</InputError>
            <ButtonContainer>
                <Button type="1" onClick={backPage}>Back</Button>
                <Button type="2" onClick={nextPage}>Next</Button>
            </ButtonContainer>
        </CardHolder>
    );

    // Register
    const page4 = (
        <CardHolder>
            <Title>Lets hear about yourself</Title>
            <Input
                value={email.value} error={email.errorMsg}
                onChange={e => setEmail({ value: e.target.value.toLowerCase(), errorMsg: '' })}
            >
                Email
            </Input>
            <InputError>{email.errorMsg}</InputError>
            <Input
                type="password"
                value={password.value} error={password.errorMsg} autoComplete="new-password"
                onChange={e => setPassword({ value: e.target.value, errorMsg: '' })}
            >

                Password
            </Input>
            <InputError>{password.errorMsg}</InputError>
            <div className="position-relative">
                <Input
                    value={code.value} error={!code.message.startsWith('Email') && code.message !== ''}
                    onChange={e => setCode({ value: e.target.value, message: '' })}
                >
                    Enter 6-digit code
                </Input>
                <InputError type={code.message.startsWith('Email') ? 'success' : 'error'}>
                    {code.message}
                </InputError>
                <Button type="3" onClick={sendEmail}>Send</Button>
            </div>
            <ButtonContainer>
                <Button type="1" onClick={backPage}>Back</Button>
                <Button type="2" onClick={nextPage}>Next</Button>
            </ButtonContainer>
        </CardHolder>
    );

    // This will only run ONCE when page is loaded
    // If theyre logged in, then itll redirect to the hompage
    useEffect(() => {
        authUser().then(status => {
            if (status.message == 'loggedin') {
                navigate('/home');
            } else {
                loadPage(true);
            }
        });

        // const spotifyApi = new SpotifyWebApi({
        //     refreshToken: 'AQCRPD9PiER-s33DWnh_UpI-cMGFarDkLZeKm_og9JawTp4-NgchaExXrOoBKA45M9u4NzMHlu6K2JsRltjM6CyWqrl0ZNbhVWaYNW3SgBxSJZ-IknmbfhomHK8gtKotvXA',
        //     clientId: 'f76e2cc77a064692928a9e019f67af96',
        //     clientSecret: '2d82a3c9a3a84405b21dabd345a9b6fa',
        //     redirectUri: 'http://localhost:8000/spotify'
        // });

        // spotifyApi.refreshAccessToken((err, res) => {
        //     spotifyApi.setAccessToken(res.body.access_token);
        //     spotifyApi.getTrack('7eJMfftS33KTjuF7lTsMCx').then(s => {
        //         const data = s.body;
        //         const artists = data.artists.map(s => s.name);
        //         const name = data.name;
        //         console.log(name, artists);
        //     });
        // });
    }, []);

    const pages = [page1, page2, page3, page4];

    return (
        <>
            {loaded && pages[page - 1]}
        </>
    );
};

// Check password length, characters, etc.
const handlePassword = (password) => {
    let message;

    // Check password
    if (!/.{8,}/.test(password)) {
        message = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(password)) {
        message = 'Password must have at least 1 uppercase letter';
    } else if (!/[a-z]/.test(password)) {
        message = 'Password must have at least 1 lowercase letter';
    } else if (!/^([A-z0-9#?!@$%^&*-]){8,}$/.test(password)) {
        message = 'Password must only be of letters, numbers, and special characters';
    }

    return message;
};

// a lil complicated but very crucial for thsi project! not explaining it though
const handleEmojiPopup = (setEmojis) => {
    const random = (min, max) => ~~(Math.random() * (max - min) + min);
    const urls = ['1f92e', '1f480', '1f62c', '1f976', '1f930'];
    const url = urls[random(0, urls.length)];

    const emojis = Array(7).fill(<></>).map(() => {
        return <img key={Math.random()} className='popup-emoji' style={{
            transform: 'translate3d(' + random(-100, 100) + 'px, ' + random(-50, 50) + 'px, 0) rotate(' + random(1, 360) + 'deg)',
            content: `url("https://images.emojiterra.com/twitter/v14.0/512px/${url}.png")`,
        }} />;
    });

    setEmojis(emojis);
    return true;
};