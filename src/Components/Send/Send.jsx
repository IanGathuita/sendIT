import css from './Send.css';
import { useState } from 'react';
import Accordion from '../Accordion/Accordion';

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
    const [receiversNumber,setReceiversNumber] = useState('');
    const [startLocation,setStartLocation] = useState('');
    const [endLocation,setEndLocation] = useState('');
    const [description,setDescription] = useState('');
    return(
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
                <input id="receiversNumber"  value={receiversNumber} onChange={(e) => {
                    setReceiversNumber(e.target.value);
                }} onKeyUp = {(e) => {handleKeyUp(e,receiversNumber)}}></input><br></br>
                <p className="error">Number must be in the form +254XXXXXXXXX</p>

                <label htmlFor="startLocation">Start location</label><br></br>
                <input id ="startLocation" value={startLocation} onChange={(e) => {
                    setStartLocation(e.target.value);
                }} onKeyUp = {(e) => {handleKeyUp(e,startLocation)}}></input><br></br>
                <p className="error">Start location cannot be empty</p>

                <label htmlFor="endLocation">End location</label><br></br>
                <input id="endLocation" value={endLocation} onChange={(e) => {
                    setEndLocation(e.target.value);
                }} onKeyUp = {(e) => {handleKeyUp(e,endLocation)}}></input><br></br>
                <p className="error">End location cannot be empty</p>

                <label htmlFor="description">Description</label><br></br>
                <textarea id="description" value={description} onChange={(e) => {
                    setDescription(e.target.value);
                }} onKeyUp = {(e) => {handleKeyUp(e,description)}}></textarea><br></br>
                <p className="error">Description cannot be empty</p>
                <button className='cta'>Send parcel</button>
            </form>
            </div>
        </section>
    
    );
}