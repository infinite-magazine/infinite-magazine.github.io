import React, { useState, useEffect } from "react";
import '../css/countdown.css';

interface CountdownProps {
    release_date: Date,
    children: any // i dont remember how to get the internal children 
}
//TODO: maybe fix scales and animate z-index, could be cool
//Coundown display that reveals children after designated date
const Countdown = (props: CountdownProps) => {
    const [time_left, setTimeLeft] = useState(1);
    const [lapsed, setLapsed] = useState(false);
    useEffect(() => {
        const interval_id = setInterval(() => {
            if(!lapsed){setLapsed(new Date() >= props.release_date);}
            var dif = (props.release_date.getTime() - (new Date()).getTime()) / 1000;
            setTimeLeft(dif);
        }, 1000);
    });

    if (lapsed) return props.children;

    let day_str = (Math.floor(time_left / (60 * 60 * 24)) < 10 ? '0' : '') + (Math.floor(time_left / (60 * 60 * 24))).toString() + ':';
    let hr_str = (Math.floor(time_left / (60 * 60)) % 24 < 10 ? '0' : '') + (Math.floor(time_left / (60 * 60)) % 24).toString() + ':';
    let min_str = (Math.floor(time_left / (60)) % 60 < 10 ? '0' : '') + (Math.floor(time_left / (60)) % 60).toString() + ':';
    let s_str = (Math.floor(time_left) % 60 < 10 ? '0' : '') + (Math.floor(time_left) % 60).toString();

    return (
        <div className='countdown' >
            {/* <div className='clock-container'> */}
                <div className='clock'><img id='dim-1' src='images/clock.svg' alt="Clock"/></div>
                <div className='clock'><img id='dim-2' src='images/clock.svg' alt="Clock"/></div>
                <div className='clock'><img id='dim-3' src='images/clock.svg' alt="Clock"/></div>
                <div className='clock'><img id='dim-4' src='images/clock.svg' alt="Clock"/></div>
                <div className='clock'><img id='dim-5' src='images/clock.svg' alt="Clock"/></div>
            {/* </div> */}

            <div className='issue-title' >
                ISSUE 12 TIME
            </div>

            <div className='t-minus'>
                {/* TODO: pad 1 digit elements with a 0 */}
                T-{day_str + hr_str + min_str + s_str}
            </div>
        </div>
    );
}

export default Countdown;