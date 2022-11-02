import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./LogInPage.scss";

export const LogInPage = () => {
    const navigate = useNavigate();

    const reducerFunc = (state, action) => ({ ...state, ...action });
    const [email, setEmail] = useReducer(reducerFunc, { value: '', message: '' });
    const [password, setPassword] = useReducer(reducerFunc, { value: '', message: '' });

    const handleClick = async () => {
        const reqOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        const data = await fetch("http://localhost:8000/api/auth/login", reqOptions)
            .then(res => res.json());

        console.log(data);

        if (data.error === "email") {
            return navigate('/register');
        } else if (data.error === "password") {
            return setPassword({ message: "Wrong Password" });
        }

    };

    return (
        <div className="login-container">
            <form className="login-form">
                <div className="login-content">
                    <h3 className="login-title">Sign In</h3>
                    <div className="form-group mt-3 login-email">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            onChange={(e) => setEmail({ value: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3 login-password">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={(e) => setPassword({ value: e.target.value })}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3 login-buttons">
                        <button
                            className="btn btn-outline-primary login-submit"
                            onClick={e => handleClick()}
                        >
                            Submit
                        </button>
                        <button
                            className="btn btn-outline-secondary login-register"
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
