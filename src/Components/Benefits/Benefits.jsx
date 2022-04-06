import Benefit from "../Benefit/Benefit";
import css from "./Benefits.css";
export default function Benefits(){
    const benefitsTitles = [
        "Discounted rates",
        "Fast deliveries",
        "Any location"
    ]
    const benefitsDescriptions = [
        "We value our customers! As a mode of appreciation, we offer the best discounts in the region. Send as many parcels as you want without feeling a strain in your pocket.",
        "Enjoy fast shipping of parcels at any time using our same day delivery package. This package guarantees that your parce wil be delivered on the same day that it's sent.",
        "Our company is not limited to a particular location. You can send your package to any part of this country and we wil ship it safely and faster than any other courier."
    ]
    return(
        <section className="benefits">
            <Benefit title={benefitsTitles[0]} description= {benefitsDescriptions[0]}></Benefit>
            <Benefit title={benefitsTitles[1]} description= {benefitsDescriptions[1]}></Benefit>
            <Benefit title={benefitsTitles[2]} description= {benefitsDescriptions[2]}></Benefit>
        </section>
    );
}