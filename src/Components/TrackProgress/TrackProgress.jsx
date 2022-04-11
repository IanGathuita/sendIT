import StepProgressBar from "../StepProgressBar/StepProgressBar";
import { useLocation } from "react-router-dom";
export default function TrackProgress(){
    const location = useLocation();
    console.log(location.state.status);
    return(
        <section>
            <h1>Progress for your parcel</h1>
            <StepProgressBar status ={location.state.status}/>
            {location.state.status === 'Sent' && <h4>Your parcel has completed the first step. It will be shipped soon!</h4>}
            {location.state.status === 'Received' && <h4>You have already received this parcel.</h4>}
            {location.state.status === 'Delivered' && <h4>Your parcel has been delivered to the recepeint. Thank you for working with us.</h4>}
        </section>
    );
}