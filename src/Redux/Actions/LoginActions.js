import { IS_LOGGED_IN } from "../Constants";

export function LoginAction(payload){
    return {
        type: IS_LOGGED_IN,
        loggedIn:payload.loggedIn
    }
}