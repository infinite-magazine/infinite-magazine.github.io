import React from "react";
import {TickerTape} from './index';
import '../css/pedestal.css';

interface PedestalProps {
    alt_text:string
}
//WRITEME: magazine mobile
/** Idea: 3 zooming overlapping  covers like in diegos animations, only 1 on mobile*/
const MagazinePedestal = (props:PedestalProps) => {
    return (
        <div className = 'pedestal'>
            <div className='container-container'>
                <div className='cov-dimension-container' id='cov-side'>
                    <div className='cov-dimension' id='cdim-1'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-2'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-3'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-4'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-5'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                </div>
                <div className='cov-dimension-container' id='cov-center'>
                    <div className='cov-dimension' id='cdim-1'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-2'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-3'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-4'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-5'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                </div>
                <div className='cov-dimension-container' id = 'cov-side'>
                    <div className='cov-dimension' id='cdim-1'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-2'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-3'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-4'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                    <div className='cov-dimension' id='cdim-5'><img src = 'images/issueXcover.jpg' alt={props.alt_text}/></div>
                </div>
            </div>
            <TickerTape id='cov-banner' title='ISSUE X OUT NOW' />
        </div>
    );
}

export default MagazinePedestal