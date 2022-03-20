import Benefit from "../Benefit/Benefit";
import css from "./Benefits.css";
export default function Benefits(){
    return(
        <section className="benefits">
            <Benefit title="Discounted rates"></Benefit>
            <Benefit title="Fast deliveries"></Benefit>
            <Benefit title="Any location"></Benefit>
        </section>
    );
}