import globe from '../../Images/globe.png';
import  './About.css';
import {FaFacebook} from "react-icons/fa";
import {FaPhone} from 'react-icons/fa';
import {FaEnvelope} from 'react-icons/fa';
import {FaTwitter} from 'react-icons/fa';
import {FaInstagramSquare} from 'react-icons/fa';
export default function About() {
    return (
        <section>
            <div className='about'>

                <div>
                    <h1>About us</h1>
                    <p>sendIT is the biggest courier service provider in Kenya. We are known for delivering packages to our customers in a swift and secure manner. We take pride
in having the cheapest costs in the industry.This is a way of giving back to our customers. We offer standard delivery services, same day delivery, parcel services and
luggage delivery services.
</p>
                </div>

                <div>
                    <img src={globe} id="about-img"></img>
                </div>
            </div>
            <div>
                <h3>Contact information</h3>
                <ul className='contact-list'>
                    <li><FaPhone/> <a href="tel:0712345678"></a>0712 345 678</li>
                    <li><FaEnvelope/> <a href="mailto:sendit@gmail.com">sendit@gmail.com</a></li>
                    <li><FaFacebook/> <a href="https://www.facebook.com/">sendit</a></li>                    
                    <li><FaTwitter/> <a href="https://www.twitter.com/">sendit</a></li>
                    <li><FaInstagramSquare/> <a href="https://www.instagram.com/">sendit</a></li>
                </ul>
            </div>

        </section>
    );
}