import css from './Parcel.css';
import {FaChevronRight} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
export default function Parcel({parcelDescription}){
    const navigate = useNavigate();
    return(
        <div className="parcel">
            <h4>{parcelDescription}</h4>
            <p>Pending</p>
            <button className='btnWithIcon' onClick={ () => {
                navigate('/trackprogress')}}>View progress<FaChevronRight/></button>
        </div>
    );
}