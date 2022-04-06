import Parcel from "../Parcel/Parcel";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { GetSentParcelsAction } from "../../Redux/Actions/UsersActions";



export default function SentParcels() {
    // const [sentParcels, setSentParcels] = useState("");
    const loginStatus = useSelector(state => state.loggedIn);
    const sentParcels = useSelector(state => state.sentParcels);
    console.log("Sent parcels ", sentParcels)
    const dispatch = useDispatch();

    //Effect callbacks are synchronous to prevent race conditions. I Put the async function inside

    useEffect(function () {
        async function fetchData() {
            dispatch(GetSentParcelsAction());
        }
        fetchData();
    }, []);
    
    

    
    return(
        
        loginStatus ?
        sentParcels ?  (sentParcels.length > 0 ?
        sentParcels.map((parcel) => {
            
            return (
                <div key={parcel.id}>
                    <Parcel parcelDescription={parcel.description}></Parcel>
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