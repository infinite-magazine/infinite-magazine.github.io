import React from "react";
import {TickerTape} from './index';
import { Link , useNavigate} from 'react-router-dom';
import '../css/pedestal.css';


interface PedestalProps {
    img_link:string,
    alt_text:string
}
//WRITEME: magazine mobile
/** Idea: 3 zooming overlapping  covers like in diegos animations, only 1 on mobile*/
const MagazinePedestal = (props:PedestalProps) => {
    const navigate = useNavigate();
    return (
        <div className = 'pedestal'>
            <div className='container-container'
            onClick = {e=>{navigate("/issue-view/12")}}
            >
                <div className='cov-dimension-container cov-side-left'>
                    <div className='cov-dimension cdim-1'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-2'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-3'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-4'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-5'><img src = {props.img_link} alt={props.alt_text}/></div>
                </div>
                <div className='cov-dimension-container cov-center'>
                    <div className='cov-dimension cdim-1'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-2'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-3'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-4'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-5'><img src = {props.img_link} alt={props.alt_text}/></div>
                </div>
                <div className='cov-dimension-container cov-side-right'>
                    <div className='cov-dimension cdim-1'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-2'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-3'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-4'><img src = {props.img_link} alt={props.alt_text}/></div>
                    <div className='cov-dimension cdim-5'><img src = {props.img_link} alt={props.alt_text}/></div>
                </div>
            </div>
            <TickerTape id='cov-banner' title='ISSUE 12' link="/issue-view/12"/>
        </div>
    );
}

export default MagazinePedestal