import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import notifySuccess from "../../Helpers/notifySuccess";
import notifyFailure from "../../Helpers/notifyFailure";
export default function UpdateParcel(props){
    const location = useLocation();
    const id = location.state.id;
    let parcelToEdit;
    const allParcels = useSelector(state => state.allParcels);
    if(allParcels){
        function getParcelToEdit(allParcels, parcelId){
            const parcelToEdit = allParcels.filter(parcel => parcel.id == parcelId);
            return parcelToEdit[0];
        }
        parcelToEdit = getParcelToEdit(allParcels,id);
    }
    const [parcel,setParcel] = useState({
        id,
        sender_number:parcelToEdit.sender_number,
        senders_id:parcelToEdit.sender_id,
        receiver_number: parcelToEdit.receiver_number,
        start_location: parcelToEdit.start_location,
        end_location: parcelToEdit.end_location,
        description: parcelToEdit.description,
        current_location : parcelToEdit.current_location,
        is_deleted: parcelToEdit.is_deleted,
        is_updated: parcelToEdit.is_updated,
        is_sent: parcelToEdit.is_sent,
        is_delivered: parcelToEdit.is_delivered

    });
    return(
        <section>
            <h2>Update parcel</h2>
            <form className='form-desktop'>
            <label htmlFor="receiver_number">Receiver's number</label><br></br>
                <input id="receiver_number"  value={parcel.receiver_number} onChange={ (e) => {
                        setParcel({...parcel, receiver_number : e.target.value})
                    }} ></input><br></br>
                
                <label htmlFor="start_location">Start location</label><br></br>
                <input id ="start_location" value={parcel.start_location} onChange={ (e) => {
                        setParcel({...parcel, start_location : e.target.value})
                    }} ></input><br></br>
                
                <label htmlFor="end_location">End location</label><br></br>
                <input id="end_location" value={parcel.end_location} onChange={ (e) => {
                        setParcel({...parcel, end_location : e.target.value})
                    }} ></input><br></br>
                
                <label htmlFor="description">Description</label><br></br>
                <textarea id="description" value={parcel.description} onChange={ (e) => {
                        setParcel({...parcel, description : e.target.value})
                    }} ></textarea><br></br>
                <label htmlFor="current_location">Current location</label><br></br>
                <input id="current_location" value={parcel.current_location} onChange={ (e) => {
                        setParcel({...parcel, current_location : e.target.value})
                    }} ></input><br></br>
                     <label htmlFor="is_deleted">Is deleted</label><br></br>
                <input id="is_deleted" value={parcel.is_deleted} onChange={ (e) => {
                        setParcel({...parcel, is_deleted : e.target.value})
                    }} ></input><br></br>
                    <label htmlFor="is_updatedd">Is Updated</label><br></br>
                <input id="is_updated" value={parcel.is_updated} onChange={ (e) => {
                    setParcel({...parcel, is_updated : e.target.value})
                }} ></input><br></br>
                <label htmlFor="is_sent">is Sent</label><br></br>
                <input id="is_sent" value={parcel.is_sent} onChange={ (e) => {
                    setParcel({...parcel, is_sent : e.target.value})
                }} ></input><br></br>
                <label htmlFor="is_delivered">Is Delivered</label><br></br>
                <input id="is_delivered" value={parcel.is_delivered} onChange={ (e) => {
                    setParcel({...parcel, is_delivered : e.target.value})
                }} ></input><br></br>
                <button onClick={
                        (e) => {
                            e.preventDefault();
                            console.log(parcel);
                            fetch('/api/updateparcel', {
                                method:"PUT",
                                headers:
                                    { "content-type": "application/json", 'x-access-token': localStorage.getItem('x-access-token') },
                                 body: JSON.stringify(parcel)
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.err){
                                    notifyFailure(data.err);
                                }
                                else{
                                    notifySuccess(data.message);
                                }
                            })
                            .catch(e => notifyFailure(e.message));

                        }

                    }>Update parcel</button>
                
            </form>
            
        </section>
    )
}