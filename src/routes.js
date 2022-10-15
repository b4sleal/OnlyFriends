import { Route, Routes } from 'react-router-dom';
import React from 'react';

import { MainPage } from './components/MainPage';
import { Register } from './components/Register';
import { LoggedIn } from './components/LoggedIn';
//import { Login } from './components/Login';

export default (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="register" element={<Register />} />
        <Route path="loggedin" element={<LoggedIn />} />
    </Routes>
);

//        <Route path="login" element={<Login />} />
