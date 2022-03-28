import {Slide, toast} from 'react-toastify';
export default function notifyFailure(message){
    //close after 15 seconds
    toast.error(message,{autoClose:15000,position:"bottom-right",transition:Slide});
}