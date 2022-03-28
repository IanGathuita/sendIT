import { UPDATE_USER} from "../Constants";

export function UpdateUserAction(payload){
    return {
        type: UPDATE_USER,
        id:payload
    }
}