import { Route, Routes } from "react-router-dom";
import React from "react";

import { MainPage } from "./pages/MainPage";
import { LoggedIn } from "./pages/LoggedIn";
import { LogInPage } from "./pages/LogInPage";
import { Register } from "./pages/Register";
import { Homepage } from "./pages/homepage";

export default (
    <Routes>
        {/*anything besides the elements below wil just route to the main page*/}
        <Route path="/" element={<MainPage />} />
        <Route path="home" element={<Homepage />} />
        <Route path="register" element={<Register />} />
        <Route path="loggedin" element={<LoggedIn />} />
        <Route path="LogInPage" element={<LogInPage />} />
    </Routes>
);