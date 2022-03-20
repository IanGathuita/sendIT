import { useState } from 'react';
import css from './SignUp.css';
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

    const [fullName,setFullName] = useState('');
    const [username,setUsername] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConfirmation,setPasswordConfirmation] = useState('');
    return (
        <section>
            <h1>Create an account</h1>
           
            <form className='form-desktop'>
                <h4>Section {currentSection} 0f 2</h4>
                <div className="first-form-section form-section">
                    <label>Full name</label><br></br>
                    <input id="fullName"></input><br></br>
                    <label>Username</label><br></br>
                    <input id="username"></input><br></br>
                    <label>Phone number</label><br></br>
                    <input id="number"></input><br></br>
                    <button onClick={(e) => {setCurrentSection(2);handleNextSection(e)}}>Next section</button>
                </div>
                <div className="second-form-section form-section">
                    <label>Email</label><br></br>
                    <input id="email"></input><br></br>
                    <label>Password</label><br></br>
                    <input id="password" type="password"></input><br></br>
                    <label>Confirm password</label><br></br>
                    <input id="password2" type="password"></input><br></br>
                    <div className='form-buttons'>
                    <button className="ghost-button" onClick={(e) => {setCurrentSection(1);handlePreviousSection(e)}}>Previous section</button>
                    <button onClick={
                    (e) => {
                        e.preventDefault();
                        const signupBody = JSON.stringify({ fullName,username,phoneNumber,email,password,passwordConfirmation });
                        fetch("/api/signup", { method: "POST", headers: { "content-type": "application/json" }, body: signupBody })
                            .then(res => res.json())
                            .then(message => console.log(message))
                            .catch(e => console.log(e.message))
                    }
                }>Submit</button>
                    </div>
                </div>
            </form>
        </section>

    );
}