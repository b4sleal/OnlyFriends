import { Route, Routes } from 'react-router-dom';
import React from 'react';

import { MainPage } from './components/MainPage';
import { Register } from './components/Register';
import { LoggedIn } from './components/LoggedIn';
import { LogInPage } from './components/LogInPage';
//import { Login } from './components/Login';

export default (
    <Routes>
        {/**
         * 
         * 
         * the * means that anything besides the elements below wil just route to the main page
         * you have to add the route to loginpage below
         */}
        <Route path="*" element={<MainPage />} />
        <Route path="home" element={<MainPage />} />
        <Route path="register" element={<Register />} />
        <Route path="loggedin" element={<LoggedIn />} />
        <Route path="LogInPage" element={<LogInPage />} />
    </Routes>
);

//        <Route path="login" element={<Login />} />
