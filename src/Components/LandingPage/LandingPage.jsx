import package_delivery_image from '../../Images/Package delivery.png';
import landing from './LandingPage.css';
import { useState,useEffect } from "react";
import { useSelector } from 'react-redux';
import SiteIntro from '../SiteIntro/SiteIntro';

import Benefits from '../Benefits/Benefits';
export default function LandingIntro(props){
    return(
        <>
            <SiteIntro/>
            <Benefits/>
        </>        
    );
}