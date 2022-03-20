import avatar from '../../Images/Ian.jpg';
import css from './Header.module.css';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const handleMenuOpen = () => {
    const nav = document.querySelector("nav");
    nav.classList.remove(css.navClosed);
    nav.classList.add(css.navOpened);
}
const handleMenuClose = () => {
    const nav = document.querySelector("nav");
    nav.classList.remove(css.navOpened);
    nav.classList.add(css.navClosed);
}


export default function Header(){
    const loginStatus = useSelector(state => state.loggedIn);
    const navigate = useNavigate();
    return(
        <header>
            <span  id={css.menuIcon} onClick = {handleMenuOpen}>&#9776;</span>
            <h3><Link to='/'>sendIT</Link></h3>
            <nav>
                <ul>
                <li id={css.closeMenuIcon} onClick = {handleMenuClose}>&times;</li>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/parcels'>Parcels</Link></li>
                    <li><Link to='/send'>Send</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    {/* <li><Link to='/signup'>Sign up</Link></li> */}
                </ul>
            </nav>
            { loginStatus ? <img src={avatar} id={css.avatar} ></img> : <button id = {css.loginBtn} onClick={() => {navigate('/login');}}>Log in</button>}
        </header>
    );
}