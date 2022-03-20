import { Link } from "react-router-dom";
import css from './Footer.css';
export default function Footer() {
    return (
        <footer>
            <div className="socials">
                <h4>Socials</h4>
                <ul>
                    <li><a href="https://www.facebook.com/">Facebook</a></li>
                    <li><a href="https://www.instagram.com/">Instagram</a></li>
                    <li><a href="https://www.twitter.com/">Twitter</a></li>
                </ul>

            </div>
            <div className="Other-sections">
                <h4>Other sections</h4>
                <ul>
                    <li><Link to="/parcels">Parcels</Link></li>
                    <li><Link to="/send">Send</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>

            </div>
        </footer>
    );
}