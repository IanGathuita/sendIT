import css from './Accordion.css';
import {FaPlus} from 'react-icons/fa';
import {FaMinus} from 'react-icons/fa';
import { useState } from 'react';
function handleAccordionClick(e) {
    let accordionBody;
    //take advantage of event bubbling
    if (e.target.classList.contains('accordion-svg-plus') || e.target.classList.contains('accordion-svg-minus')) {
        accordionBody = e.target.parentElement.nextElementSibling;
    }
    else if(e.target.classList.contains('accordion-header')){
        accordionBody = e.target.nextElementSibling;
        console.log(e.target);
    }
    else if(e.target.classList.contains('accordion-h4')){
        accordionBody = e.target.parentElement.nextElementSibling;
        console.log(e.target);
    }
    //svg tag has a path tag inside it
    else{
        accordionBody = e.target.parentElement.parentElement.nextElementSibling;
    }
    if (accordionBody.style.display === 'none') {
        accordionBody.style.display = 'block';
    }
    else {
        accordionBody.style.display = 'none';
    }
}

export default function Accordion({title,body}){
    const [isAccordionBodyVisible, setIsAccordionBodyVisible] = useState(true);
    return(
        <div className="accordion">
            <div className="accordion-header"  onClick={ (e)=>{
                    if(isAccordionBodyVisible){
                        setIsAccordionBodyVisible(false)
                    }
                    else{
                        setIsAccordionBodyVisible(true);
                    };
                    handleAccordionClick(e); }}>
                <h4 className='accordion-h4'>{title}</h4>
                {isAccordionBodyVisible || <FaPlus className='accordion-svg-plus'></FaPlus>}
                {isAccordionBodyVisible && <FaMinus className='accordion-svg-minus'></FaMinus>}
            </div>
            <div className="accordion-body">
                <p>{body}</p>
            </div>
        </div>
    );
}