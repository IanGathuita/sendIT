import validateEmail from "../../Helpers/validation";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import notifySuccess from "../../Helpers/notifySuccess";
import notifyFailure from "../../Helpers/notifyFailure";
import { LOG_IN_FAILURE } from "../../Redux/Constants";

import { LoginAction } from "../../Redux/Actions/UsersActions";




export default function Login(){
    const [isLoginToastShown,setIsloginToastShown] = useState(false);
    const loginStatus = useSelector(state => state.loggedIn);
    const token = useSelector(state => state.token);
    const error = useSelector(state => state.error);
    useEffect(() => {
        if (loginStatus) {
            localStorage.setItem('x-access-token', token);
            localStorage.setItem('x-access-token-expiration', Date.now() + 3 * 24 * 60 * 60 * 1000); //3 days in ms
            if(isLoginToastShown === false){
              setIsloginToastShown(true);
              notifySuccess("Successfully logged in.");
            }
            navigate('/');
        }
    },[loginStatus]);

    useEffect(() => {
        if(error.err){            
            notifyFailure(error.err);
            dispatch({
                type: LOG_IN_FAILURE,
                error: ""
            });
        }

    },[error]);

    const [user,setUser] = useState({        
        email: "",
        password: "",
    }); 
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    
     
    return(
        <section>          

            <h1>Login</h1>
            <form className="form-desktop">
                
                <label>Email</label><br></br>
                <input id="email"  value={user.email} onChange={ (e) => {
                        setUser({...user, email: e.target.value})
                    }}></input><br></br>
                <label>Password</label><br></br>
                <input id="password" type="password" value={user.password} onChange={ (e) => {
                        setUser({...user, password : e.target.value})
                    }}></input><br></br>
                <button onClick={
                    async (e) => {
                        e.preventDefault();
                        const loginBody = JSON.stringify({ email:user.email, password:user.password});
                        dispatch(LoginAction(loginBody));
                    }
                }>Submit</button>
                <Link to="/ForgotPassword">Forgot password?</Link>                
            </form>
            <div id="no-account">
                <h3>I do not have an account</h3>
                <button className="ghost-button" onClick={() =>{
                    navigate('/signup');
                }}>Sign up</button>
            </div>
            
        </section>
    );
}