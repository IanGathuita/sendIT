import { UPDATE_PARCEL} from "../Constants";

export function UpdateParcelAction(payload){
    return {
        type: UPDATE_PARCEL,
        id:payload
    }
}