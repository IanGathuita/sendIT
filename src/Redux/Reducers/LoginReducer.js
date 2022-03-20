import { IS_LOGGED_IN } from "../Constants";

const initialState = {
    loggedIn: false
}

export default function LoginReducer(state = initialState, action) {
    
    switch (action.type) {
        case IS_LOGGED_IN: return { ...state, loggedIn : action.loggedIn};
        default: return state;
    }

}