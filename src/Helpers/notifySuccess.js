import {Slide, toast} from 'react-toastify';
export default function notifySuccess(message){
    toast.success(message,{autoClose:true,position:"bottom-right",transition:Slide});
}