import css from './Benefit.css';
export default function Benefit({title,description}){
    return(
            <div className="benefit">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
    );
}