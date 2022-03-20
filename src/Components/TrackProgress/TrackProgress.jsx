import StepProgressBar from "../StepProgressBar/StepProgressBar";
export default function TrackProgress(){
    return(
        <section>
            <h1>Progress for your parcel</h1>
            <StepProgressBar/>
            <h4>Your parcel order has been received. The parcel will be shipped in 2 days!</h4>
        </section>
    );
}