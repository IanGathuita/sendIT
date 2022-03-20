import { useNavigate } from "react-router-dom";
export default function NotFound(){
    const navigate = useNavigate();
    return(
        <section>
            <h1>That page could not be found</h1>
            <p>Try navigating using the links in the header or click the following button to go
                to the homepage.</p>
            <button onClick={() => {navigate('/')} } className="btn-margins">Go to homepage</button>
        </section>
    );
}