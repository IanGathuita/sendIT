import globe from '../../Images/globe.png';
import css from './About.css';
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
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium eveniet asperiores vero quis natus obcaecati, repellendus enim eligendi eius dignissimos libero sit nihil ab, veritatis ipsum quibusdam? Quae quam illo odio vero ullam quasi ad? Non commodi assumenda quis pariatur natus porro odit nemo totam, quidem repudiandae quasi neque doloribus?</p>
                </div>

                <div>
                    <img src={globe} id="about-img"></img>
                </div>
            </div>
            <div>
                <h3>Contact information</h3>
                <ul className='contact-list'>
                    <li><FaPhone/>Phone</li>
                    <li><FaEnvelope/> Email</li>
                    <li><FaFacebook/> Facebook</li>                    
                    <li><FaTwitter/> Twitter</li>
                    <li><FaInstagramSquare/> Instagram</li>
                </ul>
            </div>

        </section>
    );
}