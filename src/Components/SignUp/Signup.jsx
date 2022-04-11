import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import css from './SignUp.css';
import 'react-toastify/dist/ReactToastify.css';
import notifyFailure from '../../Helpers/notifyFailure';
import notifySuccess from '../../Helpers/notifySuccess';
import {useDispatch, useSelector} from 'react-redux';
import { SignUpAction } from '../../Redux/Actions/UsersActions';
import { SIGN_UP_FAILURE, SIGN_UP_SUCCESS } from '../../Redux/Constants';

function handleNextSection(e){
    e.preventDefault();
    document.querySelector('.first-form-section').style.display = "none";
    document.querySelector('.second-form-section').style.display = "block";
}
function handlePreviousSection(e){
    e.preventDefault();
    document.querySelector('.first-form-section').style.display = "block";
    document.querySelector('.second-form-section').style.display = "none";
}

export default function SignUp() {
    const [currentSection,setCurrentSection] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.loggedIn);
    const error = useSelector(state => state.error);
    const message = useSelector(state => state.message);

    const [user,setUser] = useState({
        fullName: "",
        username: "",
        phoneNumber: "",
        email: "",
        password: "",
        passwordConfirmation: "",

    });


    useEffect(() => {
        console.log('message: ',message)
        if (message) {            
            notifySuccess('Account created successfully. You may now log in.');
            navigate('/login');
            dispatch({
                type: SIGN_UP_SUCCESS,
                message: ""
            });         
        }
    },[message]);

    useEffect(() => {
        console.log(error);
        console.log(typeof(error.err))
        if (error.err) {
            
            if (typeof (error.err) === 'object') {
                //loop through array of error objects 
                let errors = "";
                error.err.forEach((errObj) => {
                    errors = `${errors} ${errObj.message} ` + '\n';

                });
                notifyFailure(errors);
            } else {
                notifyFailure(error.err);
            }
            dispatch({
                type: SIGN_UP_FAILURE,
                error: ""
            });
        }

    }, [error]);

    

    
    return (
        <section>
            
            <h1>Create an account</h1>
           
            <form className='form-desktop'>
                <h4>Section {currentSection} 0f 2</h4>
                <div className="first-form-section form-section">
                    <label>Full name</label><br></br>
                    <input id="fullName" value={user.fullName} onChange={ (e) => {
                        setUser({...user, fullName : e.target.value})
                    }}></input><br></br>
                    <label>Username</label><br></br>
                    <input id="username" value={user.username} onChange={ (e) => {
                        setUser({...user, username : e.target.value})
                    }}></input><br></br>
                    <label>Phone number</label><br></br>
                    <input id="number" value={user.phoneNumber} onChange={ (e) => {
                        setUser({...user, phoneNumber : e.target.value})
                    }}></input><br></br>
                    <button onClick={(e) => {setCurrentSection(2);handleNextSection(e)}}>Next section</button>
                </div>
                <div className="second-form-section form-section">
                    <label>Email</label><br></br>
                    <input id="email" value={user.email} onChange={ (e) => {
                        setUser({...user, email: e.target.value})
                    }}></input><br></br>
                    <label>Password</label><br></br>
                    <input id="password" type="password" value={user.password} onChange={ (e) => {
                        setUser({...user, password : e.target.value})
                    }}></input><br></br>
                    <label>Confirm password</label><br></br>
                    <input id="confirmPassword" type="password" value={user.passwordConfirmation} onChange={ (e) => {
                        setUser({...user, passwordConfirmation : e.target.value})
                    }}></input><br></br>
                    <div className='form-buttons'>
                    <button className="ghost-button" onClick={(e) => {setCurrentSection(1);handlePreviousSection(e)}}>Previous section</button>
                    <button onClick={
                    (e) => {
                        e.preventDefault();
                        if(user.password !== user.passwordConfirmation){
                            notifyFailure('Password must match with its confirmation');
                            return;
                        }
                        const signupBody = JSON.stringify({ "full_name":user.fullName,username: user.username,"phone_number":user.phoneNumber,email:user.email,password:user.password,passwordConfirmation:user.passwordConfirmation });
                        dispatch(SignUpAction(signupBody));
                    }
                }>Submit</button>
                
                
                    </div>
                </div>
            </form>
        </section>

    );
}