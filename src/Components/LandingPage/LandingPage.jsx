import package_delivery_image from '../../Images/Package delivery.png';
import landing from './LandingPage.css';
import SiteIntro from '../../SiteIntro/SiteIntro';

import Benefits from '../Benefits/Benefits';
export default function LandingIntro(props){
    return(
        <>
            <SiteIntro/>
            <Benefits/>
        </>        
    );
}