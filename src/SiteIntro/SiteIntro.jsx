import package_delivery_image from '../Images/Package delivery.png';
import siteIntro from './SiteIntro.css';
export default function SiteIntro(){
    return(
        <section  className='site-intro'>           
            <div>
                <h1>Want to send or receive a parcel?</h1>
                <p>We've got you. sendIT is a Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Proin nec felis tincidunt, euismod elit a, aliquam dui. Vivamus lacinia ligula ligula,
                     in maximus massa bibendum eu. Donec fermentum ullamcorper tempor. In feugiat nisi 
                     sapien, sit amet ullamcorper elit imperdiet blandit. Cras porta, orci nec scelerisque
                      cursus, est ante vehicula nunc.</p>
            </div>
            <div>
                <img src={package_delivery_image}></img>
            </div>
        </section>
    );
}