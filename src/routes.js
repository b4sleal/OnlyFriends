import { Route, Routes } from "react-router-dom";
import React from "react";

import { MainPage } from "./components/MainPage";
import { Register } from "./components/Register";
import { LoggedIn } from "./components/LoggedIn";
import { LogInPage } from "./components/LogInPage";
import { CreateProfile } from "./components/CreateProfile";
//import { Login } from './components/Login';

export default (
    <Routes>
        {/*anything besides the elements below wil just route to the main page*/}
        <Route path="/" element={<MainPage />} />
        <Route path="home" element={<MainPage />} />
        <Route path="register" element={<Register />} />
        <Route path="createprofile" element={<CreateProfile />} />
        <Route path="loggedin" element={<LoggedIn />} />
        <Route path="LogInPage" element={<LogInPage />} />
    </Routes>
);