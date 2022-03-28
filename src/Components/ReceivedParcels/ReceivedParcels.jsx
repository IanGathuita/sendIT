import Parcel from "../Parcel/Parcel";
import { useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { ReceivedParcelsAction } from "../../Redux/Actions/ReceivedParcesAction";
export default function ReceivedParcels(){
    const loginStatus = useSelector(state => state.loggedIn);
    const receivedParcels = useSelector(state => state.receivedParcels);
    const dispatch = useDispatch();
    console.log(receivedParcels);

    useEffect(function () {
        async function fetchData() {
            let response = await fetch('/api/receivedparcels', {
                headers:
                    { "content-type": "application/json", 'x-access-token': localStorage.getItem('x-access-token') }
            });
            let myReceivedParcels = await response.json();

            
            dispatch(ReceivedParcelsAction({"receivedParcels":myReceivedParcels}))
            console.log("my received parcels are: ",myReceivedParcels);
        }
        fetchData();
    }, []);
    return(
        
        loginStatus ?  (receivedParcels && receivedParcels.length > 0 ?
        receivedParcels.map((parcel) => {
            
            return (
                <div key={parcel.id}>
                    <Parcel parcelDescription={parcel.description}></Parcel>
                </div>
            );

        })
        :
        <h3>You have not received any parcels yet.</h3>
    )
        :
        <h3>Please log in to view your parcels</h3>
    
    );
    
    return(
        <div>
            <h3>You have not received any parcels yet.</h3>
        </div>
    );

}