import validateEmail from "../../Helpers/validation";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../Redux/Actions/LoginActions";
import css from './Login.css';


export default function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return(
        <section>
            <h1>Login</h1>
            <form className="form-desktop">
                
                <label>Email</label><br></br>
                <input id="email"  value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }}></input><br></br>
                <label>Password</label><br></br>
                <input id="password" type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }}></input><br></br>
                <button onClick={
                    (e) => {
                        e.preventDefault();
                        const loginBody = JSON.stringify({ email, password });
                        fetch("/api/login", { method: "POST", headers: { "content-type": "application/json" }, body: loginBody })
                            .then(res => res.json())
                            .then(resJson => {
                                console.log(resJson.message)
                                if(resJson.message == "You are now logged in"){                                    
                                    dispatch( LoginAction({"loggedIn":true}) );
                                }
                            })
                            .catch(e => console.log(e.message))
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