import { Navigate, redirect, useNavigate } from 'react-router-dom';
import React, { useState, useReducer, useEffect } from 'react';
import { getUser } from './auth/getUser';

import {
    Button,
    ButtonContainer,
    Input,
    InputError,
    CardHolder,
    Title
} from './components/RegisterComponents';
import './Register.scss';

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
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(mylaurier|uwaterloo|utoronto|queensu)\.ca$/;
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

            // Options for the request
            const reqOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.value,
                    age: age.value,
                    gender: gender.value,
                    email: email.value,
                    password: password.value
                })
            };

            // Make request to backend to register user
            const data = await fetch('http://localhost:8000/api/auth/register', reqOptions)
                .then(res => res.json());

            // Error check: if the account already exists
            if (data.invalid == 'exists') {
                return setEmail({ errorMsg: 'Email already exists' });
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

    // Enter their name
    const page1 = (
        <CardHolder>
            <Title>Lets hear about yourself</Title>
            <Input
                value={name.value} error={name.errorMsg}
                onChange={e => setName({ value: e.target.value, errorMsg: '' })}
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
                value={age.value} error={age.errorMsg} valid="number"
                onChange={e => setAge({ value: e.target.value, errorMsg: '' })}
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
                onChange={e => setEmail({ value: e.target.value, errorMsg: '' })}
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
            <ButtonContainer>
                <Button type="1" onClick={backPage}>Back</Button>
                <Button type="2" onClick={nextPage}>Next</Button>
            </ButtonContainer>
        </CardHolder>
    );

    // This will only run ONCE when page is loaded
    // If theyre logged in, then itll redirect to the hompage
    useEffect(() => {
        getUser().then(status => {
            console.log(status);
            if (status == 'loggedin') {
                navigate('/home');
            } else {
                loadPage(true);
            }
        });
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