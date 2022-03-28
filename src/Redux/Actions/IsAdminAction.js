import { IS_ADMIN } from "../Constants";

export function IsAdminAction(payload){
    return {
        type: IS_ADMIN,
        isAdmin:payload
    }
}