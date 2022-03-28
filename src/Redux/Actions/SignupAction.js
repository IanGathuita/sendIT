import { SIGN_UP} from "../Constants";

export function LoginAction(payload){
    return {
        type: SIGN_UP,
        signup:payload.signup
    }
}