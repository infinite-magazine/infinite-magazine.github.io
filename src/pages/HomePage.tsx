import React,{useEffect} from 'react';
import {TickerTape, Countdown, MagazinePedestal} from '../components';
import '../css/homepage.css';

const releaseDate = new Date(2024, 3, 27, 19);
const HomePage = () =>{
    return (
        <div className = 'homepage'>
        <TickerTape title = 'INFINITE' id='title'/>
        <Countdown release_date={releaseDate}>
           <MagazinePedestal  img_link = 'images/issue12cover.png' alt_text='INFINITE MAGAZINE ISSUE XII: TIME'/>
        </Countdown>
        <div className = 'links'>
            <hr id='link-top-line' />
            <TickerTape title = 'WHO ARE WE' link='/about' id = 'banner'  direction='reverse'/>
            <hr/>
            <TickerTape title = 'PAST ISSUES' link='/past-issues' id = 'banner'  />
            <hr/>
            <TickerTape title = 'INSTAGRAM' link='https://www.instagram.com/infinite_magazine' id = 'banner'  direction='reverse'/>
        </div>
        </div>
    );
}

export default HomePage;
