import React,{useEffect} from 'react';
import {TickerTape, Countdown, MagazinePedestal} from '../components';
import '../css/homepage.css';

const releaseDate = new Date(2023, 4,10, 20);
const HomePage = () =>{
    return (
        <div className = 'homepage'>
        <TickerTape title = 'INFINITE' id='title'/>
        <Countdown release_date={releaseDate}>
           <MagazinePedestal  alt_text='INFINITE MAGAZINE ISSUE XI: REBIRTH'/>
        </Countdown>
        <div className = 'links'>
            <hr/>
            <TickerTape title = 'ABOUT' link='/about' id = 'banner'  direction='reverse'/>
            <hr/>
            <TickerTape title = 'PAST ISSUES' link='/past-issues' id = 'banner'  />
            <hr/>
            <TickerTape title = 'INSTAGRAM' link='https://www.instagram.com/infinite_magazine' id = 'banner'  direction='reverse'/>
        </div>
        </div>
    );
}

export default HomePage;