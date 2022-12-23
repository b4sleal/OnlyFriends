import { Route, Routes } from "react-router-dom";
import React from "react";

import { MainPage } from "./pages/MainPage";
import { LogInPage } from "./pages/LogInPage";
import { Register } from "./pages/Register";
import { HomePage } from './pages/Homepage/HomePage';

export default (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginpage" element={<LogInPage />} />

        <Route path="/home" element={<HomePage initPage={1} />} />
        <Route path="/home/messaging" element={<HomePage initPage={2} />} />
        <Route path="/home/settings" element={<HomePage initPage={3} />} />
    </Routes>
);