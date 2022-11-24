import { Route, Routes } from "react-router-dom";
import React from "react";

import { MainPage } from "./pages/MainPage";
import { LogInPage } from "./pages/LogInPage";
import { Register } from "./pages/Register";
import { Messaging } from "./pages/Homepage/Messaging";
import { SettingsPage } from "./pages/Homepage/Settings";
import { Match } from "./pages/Homepage/Matching/Match";

export default (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginpage" element={<LogInPage />} />

        <Route path="/home" element={<Match />} />
        <Route path="/home/messaging" element={<Messaging />} />
        <Route path="/home/settings" element={<SettingsPage />} />
    </Routes>
);