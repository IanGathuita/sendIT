import css from './Send.css';
import { useState } from 'react';
import Accordion from '../Accordion/Accordion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import notifySuccess from "../../Helpers/notifySuccess";
import notifyFailure from "../../Helpers/notifyFailure";

const kenyanNumberPattern = /^\+254\d{9}$/;
const locationPattern = /^(\w|\d |\s)+$/;
const descriptionPattern = /(.|\s)+/;

const setValid = (e) => {
    if (e.target.classList.contains("invalid")) {
        e.target.classList.remove("invalid");
    }
    e.target.classList.add("valid");
    e.target.nextElementSibling.nextElementSibling.style.display = "none";
}
const setInvalid = (e) => {
    if (e.target.classList.contains("valid")) {
        e.target.classList.remove("valid");
    }
    e.target.classList.add("invalid");
    e.target.nextElementSibling.nextElementSibling.style.display = "block";
}

const handleKeyUp = (e,value) => {
    const inputFieldId = e.target.id;
    const targeteElement = document.getElementById(inputFieldId);
    switch(inputFieldId){
        case "receiversNumber" : console.log("ReceiversNumber");
        const isPhoneMatch = kenyanNumberPattern.test(value);
        if(isPhoneMatch){
            setValid(e);            
        }
        else{
            setInvalid(e);
        }
        break;
        case "startLocation" :
        case "endLocation" : 
        const isLocationMatch = locationPattern.test(value);
        if(isLocationMatch){
            setValid(e);            
        }
        else{
            setInvalid(e);
        }
        break;
        case "description" : 
        const isDescriptionMatch = descriptionPattern.test(value);
        if(isDescriptionMatch){
            setValid(e);            
        }
        else{
            setInvalid(e);
        }
    }
    

};



export default function Send(){

    const [parcel,setParcel] = useState({
        receiversNumber: "",
        startLocation: "",
        endLocation: "",
        description: ""
    });
    
    
    const loggedIn = useSelector(state => state.loggedIn);
    const navigate = useNavigate();
   
    return (loggedIn ? (
        <section id='sendSection'>
            <div id="sendWrapper">
            <div id='sendPageText'>
                <h1>Send your parcel in 2 simple steps</h1>
                <ol>
                    <li>Fill the form on this page</li>
                    <li>Click the send button</li>
                </ol>
                <h2>FAQs</h2>
                <Accordion title="Will I be charged for my first transaction" body="No. The first transaction is competely free."/>
                <Accordion title="How long will it take for my transaction to be processed" body="Your transaction will be processed right away!"/>
            </div>
            <form id='sendForm'>
                <label htmlFor="receiversNumber">Receiver's number</label><br></br>
                <input id="receiversNumber"  value={parcel.receiversNumber} onChange={ (e) => {
                        setParcel({...parcel, receiversNumber : e.target.value})
                    }} onKeyUp = {(e) => {handleKeyUp(e,parcel.receiversNumber)}}></input><br></br>
                <p className="error">Number must be in the form +254XXXXXXXXX</p>

                <label htmlFor="startLocation">Start location</label><br></br>
                <input id ="startLocation" value={parcel.startLocation} onChange={ (e) => {
                        setParcel({...parcel, startLocation : e.target.value})
                    }} onKeyUp = {(e) => {handleKeyUp(e,parcel.startLocation)}}></input><br></br>
                <p className="error">Start location cannot be empty</p>

                <label htmlFor="endLocation">End location</label><br></br>
                <input id="endLocation" value={parcel.endLocation} onChange={ (e) => {
                        setParcel({...parcel, endLocation : e.target.value})
                    }} onKeyUp = {(e) => {handleKeyUp(e,parcel.endLocation)}}></input><br></br>
                <p className="error">End location cannot be empty</p>

                <label htmlFor="description">Description</label><br></br>
                <textarea id="description" value={parcel.description} onChange={ (e) => {
                        setParcel({...parcel, description : e.target.value})
                    }} onKeyUp = {(e) => {handleKeyUp(e,parcel.description)}}></textarea><br></br>
                <p className="error">Description cannot be empty</p>
                <button className='cta' onClick={
                    (e) => {
                        e.preventDefault();
                        if(!loggedIn){
                            window.alert("Please log in to send a parcel");
                            return;
                        }
                        
                        const sendParcelBody = JSON.stringify({ "receiver_number": parcel.receiversNumber,"start_location": parcel.startLocation,"end_location" : parcel.endLocation,"description":parcel.description});
                        console.log(sendParcelBody);
                        fetch("/api/parcels", { method: "POST", headers: 
                              { "content-type": "application/json",'x-access-token': localStorage.getItem('x-access-token') },
                             body: sendParcelBody })
                            .then(res => res.json())
                            .then(resJson => {
                                console.log(resJson);
                                //error can be an array object with multiple validation errors
                                if(resJson.err && typeof(resJson.err) === 'object'){
                                    resJson.err.forEach((error) => {
                                        notifyFailure(error.message);
                                    })
                                }
                                else if(resJson.err){
                                    
                                    notifyFailure(resJson.err);
                                    console.log(resJson.err);
                                }  
                                else{                             
                                    console.log(resJson);
                                    notifySuccess("Parcel sent")
                                    navigate('/parcels');
                                }
                            })
                            .catch(e => {
                                console.log(e.message);
                                notifyFailure(e.message)}
                            )
                    }
                }>Send parcel</button>
            </form>
            </div>
        </section>
    
    )
    :
    <section>
    <h3>Please log in to send a parcel</h3>
    </section>
    );
    
}