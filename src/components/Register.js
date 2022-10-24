import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import './MainPage.css';
import './Register.css';

export const Register = () => {
    const [cookies, setCookie] = useCookies(['email']);
    // Email/password and error message if available
    const [{ password, errPass }, setStatePass] = useState({ password: '', errPass: 'valid' });
    const [{ repeatpassword, errPassw }, setStatePassw] = useState({ repeatpassword: '', errPass: 'valid' });
    const [{ email, errEmail }, setStateEmail] = useState({ email: '', errEmail: 'valid' });
    // Wether the user is focused on an input box or not
    const [emailUnfocus, emailUnfocusState] = useState(false);
    const [passUnfocus, passUnfocusState] = useState(false);
    // Display errors after submitting
    const [submitError, submitState] = useState('valid');
    const navigate = useNavigate();

    const handleEmail = async (event) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(mylaurier|uwaterloo|utoronto|queensu)\.ca$/;
        const { value: email } = event.target;
        let errEmail = 'valid';

        // Test if email is valid
        if (!emailRegex.test(email)) {
            errEmail = 'Invalid email';
        }

        // valid email? GREEN BOX!
        if (errEmail === 'valid') { // Valid? GREEENNN
            document.getElementById("email").style.border = '2px solid green';
        } else if (!email) { // No input? no color
            document.getElementById("email").style.border = '2px solid gray';
        } else { // bad input = bad color
            document.getElementById("email").style.border = '2px solid red';
        }

        emailUnfocusState(false); // State that user is editing the box
        setStateEmail({ email, errEmail });
    };

    const handlePassword = (event) => {
        const { value: password } = event.target;
        let errPass = 'valid';

        // Check password
        if (!/.{8,}/.test(password)) {
            errPass = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(password)) {
            errPass = 'Password must have at least 1 uppercase letter';
        } else if (!/[a-z]/.test(password)) {
            errPass = 'Password must have at least 1 lowercase letter';
        } else if (!/^([A-z0-9#?!@$%^&*-]){8,}$/.test(password)) {
            errPass = 'Password must only be of letters, numbers, and special characters';
        }

        // If its valid, or they erased the password REMOVE RED box
        if (errPass === 'valid') {
            document.getElementById("password").style.border = '2px solid green';
        } else if (!password) {
            document.getElementById("password").style.border = '2px solid gray';
        } else {
            document.getElementById("password").style.border = '2px solid red';
        }

        passUnfocusState(false);
        setStatePass({ password, errPass });
    };

    const handlerepeatPassword = (event) => {
        const { value: repeatpassword } = event.target;
        let errPass = 'valid';

        // Check password
        if (password != repeatpassword) {
            errPassw = 'Passwords do not match, please try again!';
        }

        // If its valid, or they erased the password REMOVE RED box
        if (errPassw === 'valid') {
            document.getElementById("repeatpassword").style.border = '2px solid green';
        } else if (!repeatpassword) {
            document.getElementById("repeatpassword").style.border = '2px solid gray';
        } else {
            document.getElementById("repeatpassword").style.border = '2px solid red';
        }

        passUnfocusState(false);
        setStatePass({ password, errPass });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (errPass === 'valid' && errEmail === 'valid' && errPassw === "valid") {
            const col = doc(db, 'Logins', email);
            const document = await getDoc(col);

            // Error Check if theyre already registered
            if (!document) {
                submitState('Error Occurred');
            } else if (document.exists()) {
                submitState('Account already exists');
            } else {
                submitState('valid');
                // Get pass/email from elements
                const col = doc(db, "Logins", email); // Init. document

                // Save their email locally, and password online
                setDoc(col, { password });
                setCookie('email', email, {
                    path: '/',
                    expires: new Date(new Date().getTime() + 60 * 1000)
                    // Expires in 1 minute
                    // 400 day expiration: 3.456e+7 * 1000   
                });
            }
        }

    };

    // Create a lil red thingie that tells them what they did wrong
    const credError = (message) => {
        return (
            <div className="invalid-creds" style={{ marginTop: '3px' }} hidden={message === 'valid'}>
                {message}
            </div>
        );
    };

    // Webpage view
    return (
        <div className="register-header">
            <div className="register-container">
                {cookies.email && navigate('/loggedin')}
                <form className='register-form' onSubmit={handleSubmit}>
                    <div className="input-boxes">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label> Email: </label>
                            <div className="input-box-holder" id="email">
                                <input className="input-box" value={email} onChange={handleEmail} onBlur={() => emailUnfocusState(true)} />
                            </div>

                            {/* if they enter a email and exit the input box, show possible errors */}
                            {email && emailUnfocus && credError(errEmail)}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label> Password: </label>
                            <div className="input-box-holder" id="password">
                                <input className="input-box" autoComplete="new-password" type='password' value={password} onChange={handlePassword} onBlur={() => passUnfocusState(true)} />
                            </div>
                            <label> Confirm Password: </label>
                            <div className="input-box-holder" id="repeatpassword">
                                <input className="input-box" autoComplete="new-password" type='repeatpassword' value={repeatpassword} onChange={handlerepeatPassword} onBlur={() => passUnfocusState(true)} />
                            </div>
                            <label> {password && passUnfocus && credError(errPass)} </label>
                        </div>
                    </div>
                    <div className="submit-button-box">
                        <p className="submit-button"> <button type="submit" disabled={!(password && email)}>Create</button> </p>
                    </div>

                    {credError(submitError)}
                </form>
            </div>
        </div>
    );
};