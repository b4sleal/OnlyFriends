import './App.css';
import './Register.css';
import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const Register = () => {
    const [cookies, setCookie] = useCookies(['email']);
    const [{ password, errPass }, setStatePass] = useState({ password: '', errPass: 'valid' });
    const [{ email, errEmail }, setStateEmail] = useState({ email: '', errEmail: 'valid' });
    const [emailInput, emailInputState] = useState(false);
    const [passInput, passInputState] = useState(false);
    const [submitError, submitState] = useState('valid');

    const handleEmail = async (event) => {
        const emailRegex = /^[A-z]{4}[0-9]{4}@(mylaurier|uwaterloo)\.ca$/;
        const { style, value: email } = event.target;
        let errEmail = 'valid';

        // Reset border color
        if (!emailRegex.test(email)) {
            errEmail = 'Invalid email';
        }

        // reset border color with success or no input
        if (errEmail === 'valid') {
            style.border = '1px solid green';
        } else if (!email) {
            style.border = '1px solid gray';
        } else {
            // Invalid email? RED BOX!!!1
            style.border = '1px solid red';
        }

        emailInputState(false);
        setStateEmail({ email, errEmail });
    };

    const handlePassword = (event) => {
        const { style, value: password } = event.target;
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
            style.border = '1px solid green';
        } else if (!password) {
            style.border = '1px solid gray';
        } else {
            // Invalid email? RED BOX!!!1
            style.border = '1px solid red';
        }

        passInputState(false);
        setStatePass({ password, errPass });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (errPass === 'valid' && errEmail === 'valid') {
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
            <div className="invalid-creds" hidden={message === 'valid'}>
                {message}
            </div>
        );
    };

    // Webpage view
    return (
        <div className="App-header">
            <form className='register-form' onSubmit={handleSubmit}>
                {cookies.email && <Navigate replace to="/loggedin" />}

                <p> Email: </p>
                <input value={email} onChange={handleEmail} onBlur={() => emailInputState(true)} />

                {/* if they enter a email and exit the input box, show possible errors */}
                {email && emailInput && credError(errEmail)}

                <p> Password: </p>
                <input autoComplete="new-password" type='password' value={password} onChange={handlePassword} onBlur={() => passInputState(true)} />

                {password && passInput && credError(errPass)}

                <p> <button type="submit" disabled={!(password && email)}>Create</button> </p>

                {credError(submitError)}
            </form>
        </div>
    );
};