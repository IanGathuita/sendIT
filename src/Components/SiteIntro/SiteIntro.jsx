import package_delivery_image from '../../Images/Package delivery.png';
import siteIntro from './SiteIntro.css';
export default function SiteIntro(){
    return(
        <section  className='site-intro'>           
            <div>
                <h1>Want to send or receive a parcel?</h1>
                <p>We got you! sendIT is the biggest courier service provider in Kenya. We are known for delivering packages to our customers in a swift and secure manner. We take pride
in having the cheapest costs in the industry.This is a way of giving back to our customers. We offer standard delivery services, same day delivery, parcel services and
luggage delivery services.</p>
            </div>
            <div>
                <img src={package_delivery_image}></img>
            </div>
        </section>
    );
}