import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import css from '../UserRecords/UserRecords.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AllParcelsAction } from '../../Redux/Actions/AllParcelsAction';
import notifySuccess from "../../Helpers/notifySuccess";
import notifyFailure from "../../Helpers/notifyFailure";

import { DeleteParcelAction } from '../../Redux/Actions/DeleteParcelAction';
const deleteParcel = (id, is_deleted) => {
    if (is_deleted !== 1) {
        is_deleted = 1;
    }
    fetch(`api/parcels/${id}/cancel`, {
        method: "DELETE",
        headers:
            { "content-type": "application/json", 'x-access-token': localStorage.getItem('x-access-token') },
        body: JSON.stringify({ is_deleted })
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
        .catch(e => console.log(e.message))

}


export default function ParcelRecords({ description, id, is_deleted }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchParcels() {
            let response = await fetch('/api/parcels', {
                headers:
                    { "content-type": "application/json", 'x-access-token': localStorage.getItem('x-access-token') }
            });
            let parcels = await response.json();


            dispatch(AllParcelsAction({ "allParcels": parcels.parcels }))
            console.log(parcels.length);
        }
        fetchParcels();
    }, []);

    const allParcels = useSelector(state => state.allParcels);
    //a value that changes when an item is deleted hence refreshing the page
    const [refresh, setRefresh] = useState(0);

    return (allParcels ? (allParcels.length > 0 ?
        allParcels.map((parcel) => {

            return (
                <div className="record" key={parcel.id}>
                    <h4>{parcel.description}</h4>
                    <i onClick={() => {
                        navigate("/updateparcel", { state: { id:parcel.id } })
                    }}><FaEdit /></i>
                    <i onClick={() => {
                        deleteParcel(parcel.id, parcel.is_deleted);
                        dispatch(DeleteParcelAction(parcel.id))
                        setRefresh(refresh+1)
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