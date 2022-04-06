import avatar from '../../Images/Ian.jpg';
import css from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { LogoutAction } from '../../Redux/Actions/UsersActions';
import notifySuccess from "../../Helpers/notifySuccess";




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


export default function Header() {
    const loginStatus = useSelector(state => state.loggedIn);
    const isAdmin = useSelector(state => state.isAdmin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <header>
            <span id={css.menuIcon} onClick={handleMenuOpen}>&#9776;</span>
            <h3><Link to='/'>sendIT</Link></h3>
            <nav>
                <ul>
                    <li id={css.closeMenuIcon} onClick={handleMenuClose}>&times;</li>
                    <li><Link to='/' onClick={handleMenuClose}>Home</Link></li>
                    <li><Link to='/parcels' onClick={handleMenuClose} >Parcels</Link></li>
                    <li><Link to='/send' onClick={handleMenuClose}>Send</Link></li>
                    <li><Link to='/about' onClick={handleMenuClose}>About</Link></li>
                    { isAdmin===1 && <li><Link to='/admindashboard' onClick={handleMenuClose}>Dashboard</Link></li>}
                    
                    {/* <li><Link to='/signup'>Sign up</Link></li> */}
                </ul>
            </nav>
            {loginStatus ?
                <button id={css.logoutBtn} onClick={() => {
                    dispatch(LogoutAction());
                    localStorage.removeItem('x-access-token');
                    localStorage.removeItem('x-access-token-expiration');
                    notifySuccess('Successfully logged out');
                    navigate('/');
                }}>Log out</button>
                :
                <button id={css.loginBtn} onClick={() => { navigate('/login'); }}>Log in</button>}
        </header>
    );
}