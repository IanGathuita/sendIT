import css from './StepProgressBar.css';
import { FaShippingFast } from 'react-icons/fa';
import {RiSendPlaneFill} from "react-icons/ri";
import {GoPackage} from "react-icons/go";
import { IconContext } from 'react-icons/lib';
export default function StepProgressBar({status}) {
    let progress;
    let stepColor;
    let stepBackground;
    let iconColor;
    let firstStepColor = '#183BF0';
    
    console.log("status is ",status);
    if (status === 'Sent'){
        progress = 50;
        stepColor = '#091034'
        stepBackground = 'white'
        iconColor= '#091034' ;
    }
    else{
        progress = 100;
        stepColor = '#183BF0';
        stepBackground = '#183BF0';
        iconColor= 'white';
    }

    return (
        <div className="step-progress-bar-wrapper" >
            <div className="step-progress-bar">
                <div className="defaultBar"></div>
                <div className="currentProgressBar" style = {{width:progress + '%'}}></div>
                <div className="step" style={{backgroundColor:firstStepColor,borderColor:firstStepColor}}>
                {/* props to react icons are sent through Icontext.Provider */}
                <IconContext.Provider value = {{color:'white'}}>                   
                        <i><RiSendPlaneFill /></i> 
                </IconContext.Provider>                       
                </div>
                <div className="step" style={{borderColor:stepColor,backgroundColor:stepBackground}}>
                        <IconContext.Provider value = {{color:iconColor}}>                   
                        <i ><FaShippingFast /></i>
                        </IconContext.Provider>                         
                </div>
                <div className="step"  style={{borderColor:stepColor,backgroundColor:stepBackground}}>
                    <IconContext.Provider value = {{color:iconColor}}>                   
                        <i ><GoPackage /></i> 
                        </IconContext.Provider>                       
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