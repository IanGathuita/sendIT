import validateEmail from "../../Helpers/validation";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { LoginAction } from "../../Redux/Actions/LoginActions";
import { IsAdminAction } from "../../Redux/Actions/IsAdminAction";
import { useEffect } from "react";
import css from './Login.css';
import notifySuccess from "../../Helpers/notifySuccess";
import notifyFailure from "../../Helpers/notifyFailure";


export default function Login(){

    const [user,setUser] = useState({        
        email: "",
        password: "",
    });   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginStatus = useSelector(state => state.loggedIn);
    const isAdmin = useSelector(state => state.isAdmin);
       
     
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
                    (e) => {
                        e.preventDefault();
                        const loginBody = JSON.stringify({ email:user.email, password:user.password});
                        fetch("/api/login", { method: "POST", headers: 
                              { "content-type": "application/json",'x-access-token': localStorage.getItem('x-access-token') },
                             body: loginBody })
                            .then(res => res.json())
                            .then(resJson => {
                                console.log("resjson", resJson)
                                if(resJson.token){                                    
                                    dispatch( LoginAction({"loggedIn":true}) );
                                    dispatch(IsAdminAction(false));
                                    if(resJson.is_admin === 1){
                                        dispatch(IsAdminAction(true));
                                    }
                                    
                                    localStorage.setItem('x-access-token', resJson.token);
                                    localStorage.setItem('x-access-token-expiration', Date.now() + 3 * 24 * 60 * 60 * 1000); //3 days in ms
                                    notifySuccess("Successfully logged in.");
                                    navigate('/');
                                }
                                else{
                                    notifyFailure(resJson.err);
                                    dispatch( LoginAction({"loggedIn":false}) );
                                    dispatch(IsAdminAction(false));
                                }
                            })
                            .catch(e => {
                                notifyFailure(e.message);
                                console.log(e.message)
                            });
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