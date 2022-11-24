import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "./LogInPage.scss";

export const LogInPage = () => {
    const navigate = useNavigate();
    const reducerFunc = (state, action) => ({ ...state, ...action });
    const [email, setEmail] = useReducer(reducerFunc, { value: '', message: '' });
    const [password, setPassword] = useReducer(reducerFunc, { value: '', message: '' });

    const handleClick = async (event) => {
        event.preventDefault();

        if (!email.value) {
            return setEmail({ message: "Enter your email" });
        } else if (!password.value) {
            return setPassword({ message: "Enter your Password" });
        }

        const queryOptions = new URLSearchParams({
            email: email.value,
            password: password.value
        });

        const data = await fetch("http://localhost:8000/api/auth/login?" + queryOptions)
            .then(res => res.json());

        if (!data || data?.error === "email") {
            return setEmail({ message: "No account found. Let's create one!" });
        } else if (data?.error === "password") {
            return setPassword({ message: "Wrong Password" });
        }

        navigate('/home');
        localStorage.setItem('user', JSON.stringify(data));
    };

    const handleInput = (event) => {
        if (event.target.type === "email") {
            setEmail({ value: event.target.value, message: "" });
        } else if (event.target.type === "password") {
            setPassword({ value: event.target.value, message: "" });
        }
    };

    return (
        <div className="login-container">
            <form className="login-form">
                <div className="login-content">
                    <h3 className="login-title">Sign In</h3>
                    <div className="login-email">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            onChange={e => handleInput(e)}
                        />
                        {email.message &&
                            <div className="error-msg">
                                {email.message}
                            </div>}
                    </div>


                    <div className="login-password">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={e => handleInput(e)}
                        />
                        {password.message &&
                            <div className="error-msg">
                                {password.message}
                            </div>}
                    </div>



                    <div className="login-buttons">
                        <button
                            className="login-submit"
                            onClick={e => handleClick(e)}
                        >
                            Submit
                        </button>
                        <button
                            className="login-register"
                            onClick={e => navigate('/register')}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );

};
