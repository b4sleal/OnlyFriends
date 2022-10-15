import React, { useState, useEffect } from 'react';
import styles from "./logInPage.scss";


export const LogInPage = () => {
    return (
        <div>
            <form>
                <div className={styles["input-container"]}>
                    <label>Username</label>
                    <input type='text' required />
                </div>
                <div className={styles["input-container"]}>
                    <label>Username</label>
                    <input type='text' required />
                </div>
                <button className={styles["submit-button"]}>Submit</button>
                <button className={styles["sign-up-button"]}>Register!</button>
            </form>
        </div >
    );
};