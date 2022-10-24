import { useNavigate } from 'react-router-dom';
import React, { useState, useReducer } from 'react';
import { useCookies } from 'react-cookie';
//import { db } from '../firebaseConfig';
//import { doc, getDoc, setDoc } from 'firebase/firestore';

import './CreateProfile.css';

export const CreateProfile = () => {
    const [cookies, setCookie] = useCookies(['email']);
    const navigate = useNavigate();
    const [page, pageState] = useState(1);

    //------------------------------------------------//
    const nameReducer = (state, action) => {
        switch (action.type) {
            case 'name':
                return { ...state, value: action.value, errorMsg: '' };
            case 'errorMsg':
                return { ...state, errorMsg: action.errorMsg };
            default:
                return state;
        }
    };

    const [name, dispatch] = useReducer(nameReducer, { value: '', errorMsg: '' });
    //------------------------------------------------//


    //------------------------------------------------//
    const nextPage = (event) => {
        if (!name.value) {
            return dispatch({ type: 'errorMsg', errorMsg: 'Enter a username' });
        }

        pageState(page + 1);
    };

    const backPage = (event) => {
        pageState(page - 1);

        if (page == 1) {
            navigate('/');
        }
    };
    //------------------------------------------------//

    return (
        <section className="cp-page-card">
            <div className="cp-main-container">
                <div className="cp-container py-5 ctn-1">
                    <div className="cp-row row-cols-1 row-cols-md-2 d-flex justify-content-center">
                        <div className="cp-col mb-4">
                            <div>
                                <h1 className="cp-title-header">Create a username</h1>
                                <div className="cp-group">
                                    <input className="cp-input-box" type="text" required
                                        value={name.value}
                                        onChange={e => dispatch({ type: 'name', value: e.target.value })}
                                    />
                                    <span className={name.errorMsg ? "cp-error-bar" : "cp-bar"}></span>
                                    <label className="cp-input-label">Username</label>
                                </div>
                                <div className="cp-error-label">
                                    {name.errorMsg}
                                </div>
                                <div className="cp-button-container">
                                    <button className="default-btn cp-login-btn" type="button" onClick={() => backPage()}>Back</button>
                                    <button className="default-btn cp-create-acc-btn" type="button" onClick={() => nextPage()}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};