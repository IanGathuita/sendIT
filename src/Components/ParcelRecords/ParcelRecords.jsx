import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import css from '../UserRecords/UserRecords.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GetParcelsAction } from '../../Redux/Actions/UsersActions';
import notifySuccess from "../../Helpers/notifySuccess";
import notifyFailure from "../../Helpers/notifyFailure";

import { DeleteParcelAction } from '../../Redux/Actions/DeleteParcelAction';
import { GET_ALL_PARCELS } from '../../Redux/Constants';


export default function ParcelRecords({ description, id, is_deleted }) {
    const navigate = useNavigate();
    const allParcels = useSelector(state => state.allParcels);
    const error = useSelector(state => state.error);
    console.log("parcels ",allParcels, "parcels errors: ",error)
    const dispatch = useDispatch();
    
    useEffect(() => {
        const parcelRecordsScrollPosition = sessionStorage.getItem('parcelRecordsScrollPosition');
        if(parcelRecordsScrollPosition){
            window.scrollTo(parcelRecordsScrollPosition);
            return;
        }
        function fetchParcels() {            
            dispatch(GetParcelsAction());        }
        fetchParcels();
    }, []);
    
    useEffect(() => {
        if(error.err){       
            notifyFailure(error.err);
        }
        dispatch({
            type: GET_ALL_PARCELS,
            error: ""
        });        

    },[error]);

    const deleteParcel = (parcel) => {
        
        if (parcel.is_deleted !== 1) {
            parcel.is_deleted = 1;
        }
        fetch(`http://localhost:4000/api/parcels/${parcel.id}/cancel`, {
            method: "DELETE",
            headers:
                { "content-type": "application/json", 'authorization': localStorage.getItem('x-access-token') },
            body: JSON.stringify({ 'is_deleted': parcel.is_deleted })
        })
            .then(res => res.json())
            .then(data => {
                if(data.message){
                    notifySuccess(data.message);
                    dispatch(DeleteParcelAction({id:parcel.id,is_deleted}))
                    
                }
                if(data.err){
                    notifyFailure(data.err);
                }
            })
            .catch(e => {
                console.log(e.message);
                notifyFailure(e.message);
            })
            
    
    }
    

    return (allParcels ? (allParcels.length > 0 ?
        allParcels.map((parcel) => {

            return (
                <div className="record" key={parcel.id}>
                    <h4>{parcel.description}</h4>
                    <i onClick={() => {
                        navigate("/updateparcel", { state: { id:parcel.id } })
                    }}><FaEdit /></i>
                    <i onClick={() => {
                        sessionStorage.setItem('parcelRecordsScrollPosition', window.pageYOffset);
                        deleteParcel(parcel);                     
                            
                                             
                    }}><FaTrash /></i>
                </div>
            );

        })
        :
        <h3>No parcels to display</h3>
    )
        :
        <h3>Please log in to view all parcels</h3>
    );
}