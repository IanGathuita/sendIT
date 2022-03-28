import { DELETE_USER} from "../Constants";

export function DeleteUserAction(payload){
    return {
        type: DELETE_USER,
        id:payload
    }
}