import { DELETE_PARCEL} from "../Constants";

export function DeleteParcelAction(payload){
    return {
        type: DELETE_PARCEL,
        id:payload
    }
}