import css from './Parcels.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SentParcels from '../SentParcels/SentParcels';
import ReceivedParcels from '../ReceivedParcels/ReceivedParcels';
function handleTabsClick(e){
    if(e.target.classList.contains('sent-parcels')){
        e.target.classList.add('active-tab');
        e.target.nextElementSibling.classList.remove('active-tab');
    }
    else{
        e.target.classList.add('active-tab');
        e.target.previousElementSibling.classList.remove('active-tab');
    }
    
}
export default function Parcels(){
    const loginStatus = useSelector(state => state.loggedIn);
    const [onSentTab,setOnSentTab] = useState(true);
    let tabToDisplay = onSentTab ? <SentParcels></SentParcels> : <ReceivedParcels></ReceivedParcels>;
    return(
        loginStatus? 
        <section>
            <h1>Parcels</h1>
            <p>You can view the parcels that you have sent and received on this page, and their progress.
                For more details about a parcel, click on the 'View progress' button.
            </p>
            <div className="tabs">
                <h4 className = "active-tab sent-parcels" onClick={(e) => { setOnSentTab(true); handleTabsClick(e)}}> Sent</h4>
                <h4  className = "received-parcels" onClick={(e) => { setOnSentTab(false); handleTabsClick(e)}}>Received</h4>
            </div>
            <div className="userParcels">
                {tabToDisplay}
            </div>
        </section> 
        :
        <section>
            <h2>Please log in to see your parcel information</h2>
        </section> 
    );
}