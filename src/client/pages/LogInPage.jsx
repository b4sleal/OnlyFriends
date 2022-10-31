import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./LogInPage.scss";

export const LogInPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        //Login request here
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
                        />
                    </div>
                    <div className="form-group mt-3 login-password">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3 login-buttons">
                        <button
                            type="submit"
                            className="btn btn-outline-primary login-submit"
                            onClick={handleClick()}
                        >
                            Submit
                        </button>
                        <button
                            type="submit"
                            className="btn btn-outline-secondary login-register"
                            onClick={navigate("/register")}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
