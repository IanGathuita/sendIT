import Parcel from "../Parcel/Parcel";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { GetReceivedParcelsAction } from "../../Redux/Actions/UsersActions";



export default function ReceivedParcels() {
   
    const loginStatus = useSelector(state => state.loggedIn);
    const receivedParcels = useSelector(state => state.receivedParcels);
    console.log("Received parcels ", receivedParcels)
    const dispatch = useDispatch();

   

    useEffect(function () {
        async function fetchData() {
            dispatch(GetReceivedParcelsAction());
        }
        fetchData();
    }, []);
    
    

    
    return(
        
        loginStatus ?
        receivedParcels ?  (receivedParcels.length > 0 ?
            receivedParcels.map((parcel) => {
            
            return (
                <div key={parcel.id}>
                    <Parcel parcelDescription={parcel.description} status="Received"></Parcel>
                </div>
            );

        })
        :
        <h3>No parcels to display</h3>
    )
    :<h3>No parcels to display</h3>
        :
        <h3>Please log in to view your parcels</h3>
    
    );
}