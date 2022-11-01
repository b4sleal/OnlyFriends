import React from 'react';

// Hold everythin together
export const CardHolder = (props) => {
    return (
        <>
            <section className="cp-page-card">
                <div className="main-container">
                    <div className="container py-5 ctn-1">
                        <div className="row-cols-1 row-cols-md-2 d-flex justify-content-center">
                            <div className="col mb-4">
                                <div>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Header on the card
export const Title = (props) => {

    return (
        <>
            <h1 className="title-header">
                {props.children}
            </h1>
        </>
    );
};

// Handle input box
export const Input = (props) => {
    const handleInput = (event) => {
        const { value } = event.target; // Get the input

        // If they dont enter a number, dont let them input it ://
        if (value && props.valid === 'number' && !Number(value)) {
            return;
        }

        props.onChange(event); // run the original event 
    };

    return (
        <>
            <div className="input-group">
                <input className="input-box" required
                    value={props.value}
                    autoComplete={props.autoComplete}
                    type={props.type || 'text'}
                    onChange={event => handleInput(event)}
                />
                <span className={props.error ? "error-bar" : "bar"}></span>
                <label className="input-label">
                    {props.children}
                </label>
            </div>
        </>
    );
};

// A little label telling them what they did wrong
// e.g. Enter a valid email
export const InputError = (props) => {
    return (
        <>
            <div className={`${props.type || 'error'}-label`}>
                {props.children}
            </div>
        </>
    );
};


// contains buttons (button holder)
export const ButtonContainer = (props) => {

    return (
        <>
            <div className={"button-container " + props.className}>
                {props.children}
            </div>
        </>
    );
};

// Next/Back button
export const Button = (props) => {
    return (
        <>
            <button
                className={`default-btn default-btn btn-${props.type} ` + (props.className || "")}
                type="button"
                onClick={props.onClick}
            >
                {props.children}
            </button>
        </>
    );
};
