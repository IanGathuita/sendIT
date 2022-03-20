import css from './StepProgressBar.css';
import { FaShippingFast } from 'react-icons/fa';
import {RiSendPlaneFill} from "react-icons/ri";
import {GoPackage} from "react-icons/go";
export default function StepProgressBar() {
    return (
        <div className="step-progress-bar-wrapper" >
            <div className="step-progress-bar">
                <div className="defaultBar"></div>
                <div className="currentProgressBar"></div>
                <div className="step">                   
                        <i><RiSendPlaneFill /></i>                        
                </div>
                <div className="step">                   
                        <i><FaShippingFast /></i>                        
                </div>
                <div className="step">                    
                        <i><GoPackage/></i>                       
                </div>
            </div>
            <div className='progress-text'>
                <h3>Sent</h3>
                <h3>Shipped</h3>
                <h3>Received</h3>
            </div>
        </div>
    );
}