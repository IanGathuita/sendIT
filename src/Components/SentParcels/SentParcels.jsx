import Parcel from "../Parcel/Parcel";
import { useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { SentParcelsAction} from "../../Redux/Actions/SentParcelsAction";



export default function SentParcels() {
    // const [sentParcels, setSentParcels] = useState("");
    const loginStatus = useSelector(state => state.loggedIn);
    const sentParcels = useSelector(state => state.sentParcels);
    const dispatch = useDispatch();

    //Effect callbacks are synchronous to prevent race conditions. I Put the async function inside

    useEffect(function () {
        async function fetchData() {
            let response = await fetch('/users/id/parcels', {
                headers:
                    { "content-type": "application/json", 'x-access-token': localStorage.getItem('x-access-token') }
            });
            let mySentParcels = await response.json();

            // setSentParcels(mySentParcels);
            dispatch(SentParcelsAction({"sentParcels":mySentParcels}))
            console.log(mySentParcels);
        }
        fetchData();
    }, []);
    
    

    
    return(
        
        loginStatus ?  (sentParcels.length > 0 ?
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
        :
        <h3>Please log in to view your parcels</h3>
    
    );
}