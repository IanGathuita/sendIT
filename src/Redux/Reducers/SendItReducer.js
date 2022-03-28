import { IS_LOGGED_IN, SENT_PARCELS, ALL_USERS,ALL_PARCELS,
DELETE_PARCEL,DELETE_USER,IS_ADMIN,RECEIVED_PARCELS } from "../Constants";

const initialState = {
    loggedIn: false,
    sentParcels: {},
    receivedParcels:[],
    allUsers:{},
    allParcels:{},
    isAdmin:false
}

export default function SendItReducer(state = initialState, action) {
    
    switch (action.type) {
        case IS_LOGGED_IN: return { ...state, loggedIn : action.loggedIn};
        case IS_ADMIN: return {...state, isAdmin: action.isAdmin}
        case SENT_PARCELS : return {...state,sentParcels:action.sentParcels}
        case RECEIVED_PARCELS : return {...state,receivedParcels:action.receivedParcels}
        case ALL_USERS : return {...state,allUsers:action.allUsers}
        case ALL_PARCELS : return {...state,allParcels:action.allParcels}
        case DELETE_USER: return { ...state, allUsers: state.allUsers.filter((user) => user.id !== action.id) };
        case DELETE_PARCEL: return { ...state, allParcels: state.allParcels.filter((parcel) => parcel.id !== action.id) };
        default: return state;
    }

}