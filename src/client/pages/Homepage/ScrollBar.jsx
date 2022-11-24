import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import './ScrollBar.scss';

export const ScrollBar = ({ className = "", type, ...props }) => {


    if (type === 'horiz') {
        return (
            <Scrollbars
                renderView={props => <div {...props} className={className}></div>}
                renderTrackVertical={props => <div {...props} />}
                renderThumbVertical={props => <div {...props} />}
            >
                {props.children}
            </Scrollbars>
        );
    }


    return (
        <>
            <Scrollbars
                renderView={props => <div {...props} className={className}></div>}
                renderTrackVertical={props => <div {...props} className="scroll-track" />}
                renderThumbHorizontal={props => <div {...props} />}
                renderTrackHorizontal={props => <div {...props} />}
            >
                {props.children}
            </Scrollbars>
        </>
    );
};