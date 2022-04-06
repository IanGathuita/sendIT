
import {SIGN_UP,SIGN_UP_SUCCESS,SIGN_UP_FAILURE, LOG_IN,LOG_IN_SUCCESS,LOG_IN_FAILURE,
LOG_OUT,
GET_ALL_USERS,GET_USERS_SUCCESS,GET_USERS_FAILURE,
GET_ALL_PARCELS,GET_PARCELS_SUCCESS,GET_PARCELS_FAILURE,
GET_SENT_PARCELS,GET_SENT_PARCELS_SUCCESS,GET_SENT_PARCELS_FAILURE,
GET_RECEIVED_PARCELS,GET_RECEIVED_PARCELS_SUCCESS,GET_RECEIVED_PARCELS_FAILURE,
SEND_PARCEL,SEND_PARCEL_SUCCESS,SEND_PARCEL_FAILURE,
DELETE_USER, DELETE_PARCEL} from "../Constants";

const initialState = {
    loggedIn: false,
    sentParcels: {},
    receivedParcels: {},
    allUsers:{},
    allParcels:{},
    isParcelSent : false,
    token:"",
    loading:false,
    error:'',
    isAdmin:0,
    message:''
}




export default function SendItReducer(state = initialState, action) {
    
    switch (action.type) {
        case SIGN_UP : return { ...state, loading: true, error: "" };
        case SIGN_UP_SUCCESS : return { ...state, loading:false ,message:action.message, error:"" };
        case SIGN_UP_FAILURE : return { ...state, loading: false,message:'', error: action.error };
        case LOG_IN: return{...state, loading: true, error: ""};
        case LOG_IN_SUCCESS: return { ...state, loading:false ,loggedIn : true,token:action.token,isAdmin:action.isAdmin, error:"" };
        case LOG_IN_FAILURE: return {...state, loading: false,loggedIn : false,token:'',isAdmin:'', error: action.error};
        case LOG_OUT: return{...initialState };
        case GET_ALL_USERS: return{...state, loading: true, error: ""};
        case GET_USERS_SUCCESS: return { ...state, loading:false ,allUsers:action.users, error:"" };;
        case GET_USERS_FAILURE: return { ...state, loading: false, error: action.error,allUsers:'' };
        case GET_ALL_PARCELS: return{...state, loading: true, error: ""};
        case GET_PARCELS_SUCCESS: return { ...state, loading:false ,allParcels:action.parcels, error:"" };;
        case GET_PARCELS_FAILURE: return { ...state, loading: false, error: action.error,allParcels:'' };
        case GET_SENT_PARCELS: return{...state, loading: true, error: ""};
        case GET_SENT_PARCELS_SUCCESS: return { ...state, loading:false ,sentParcels:action.sent, error:"" };;
        case GET_SENT_PARCELS_FAILURE: return { ...state, loading: false, error: action.error,sentParcels:'' };
        case GET_RECEIVED_PARCELS: return{...state, loading: true, error: ""};
        case GET_RECEIVED_PARCELS_SUCCESS: return { ...state, loading:false ,receivedParcels:action.received, error:"" };;
        case GET_RECEIVED_PARCELS_FAILURE: return { ...state, loading: false, error: action.error,sentParcels:'' };
        case SEND_PARCEL: return{...state, loading: true, error: ""};
        case SEND_PARCEL_SUCCESS: return { ...state, loading:false ,isParcelSent : true, error:"" };
        case SEND_PARCEL_FAILURE: return {...state, loading: false,isParcelSent : false, error: action.error};
        case DELETE_USER: return { ...state, allUsers: state.allUsers.filter((user) => user.id !== action.id) };
        case DELETE_PARCEL: return { ...state, allParcels: state.allParcels.filter((parcel) => parcel.id !== action.id) };       
        default: return state;
    }

}