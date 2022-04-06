import {
    GET_ALL_USERS, GET_USERS_FAILURE, GET_USERS_SUCCESS,
     SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
     LOG_IN,LOG_IN_SUCCESS,LOG_IN_FAILURE,LOG_OUT,
      GET_ALL_PARCELS, GET_PARCELS_SUCCESS,GET_PARCELS_FAILURE,
      GET_SENT_PARCELS,GET_SENT_PARCELS_SUCCESS,GET_SENT_PARCELS_FAILURE,
      GET_RECEIVED_PARCELS,GET_RECEIVED_PARCELS_SUCCESS,GET_RECEIVED_PARCELS_FAILURE,
      SEND_PARCEL,SEND_PARCEL_SUCCESS,SEND_PARCEL_FAILURE
} from "../Constants";
import axios from "axios";
import { useSelector,useStore } from "react-redux";


axios.defaults.baseURL = 'http://localhost:4000/';

export const SignUpAction = (payload) =>  async (dispatch) => {
        dispatch({
            type: SIGN_UP,
            signupBody: payload.signupBody
        });
        try {
                  
            const { data } = await axios.post(`api/user`,JSON.parse(payload));
            if (data.err) {
                dispatch({
                    type: SIGN_UP_FAILURE,
                    error: data
                });
                
            }
            else {
                
                dispatch({
                    type: SIGN_UP_SUCCESS,
                    message: data
                });
            }
        }
        catch (e) {
            dispatch({
                type: SIGN_UP_FAILURE,
                error: e.message
            });

        }
    }

    export const LoginAction = (payload) =>  async (dispatch) => {
        dispatch({
            type: LOG_IN,
            loginBody: payload.loginBody
        });
        try {
            const { data } = await axios.post(`http://localhost:4000/api/login`,JSON.parse(payload));
            if (data.token) {
                dispatch({
                    type: LOG_IN_SUCCESS,
                    token: data.token,
                    isAdmin:data.is_admin
                });
            }
            else {
                dispatch({
                    type: LOG_IN_FAILURE,
                    error: data
                });
            }
        }
        catch (e) {
            dispatch({
                type: LOG_IN_FAILURE,
                error: e.message
            });

        }
    }

    export const LogoutAction = () =>  async (dispatch) => {
        dispatch({
            type: LOG_OUT,
        });
    }

    export const GetUsersAction = () =>  async (dispatch) => {
        dispatch({
            type: GET_ALL_USERS,
        });
        try {
            const token = localStorage.getItem('x-access-token'); 
            const { data } = await axios.get(`api/users`,{
                headers: {
                  'authorization': token
                }
              });
            if (data.users) {
                dispatch({
                    type: GET_USERS_SUCCESS,
                    users: data.users,
                });
            }
            else {
                dispatch({
                    type: GET_USERS_FAILURE,
                    error: data
                });
            }
        }
        catch (e) {
            dispatch({
                type: GET_USERS_FAILURE,
                error: e.message
            });

        }
    }

    export const GetParcelsAction = () =>  async (dispatch) => {
        dispatch({
            type: GET_ALL_PARCELS,
        });
        try {
            const token = localStorage.getItem('x-access-token');
            const { data } = await axios.get(`api/parcels`,{
                headers: {
                  'authorization': token
                }
              });
            if (data.parcels) {
                dispatch({
                    type: GET_PARCELS_SUCCESS,
                    parcels: data.parcels,
                });
            }
            else {
                dispatch({
                    type: GET_PARCELS_FAILURE,
                    error: data
                });
            }
        }
        catch (e) {
            dispatch({
                type: GET_PARCELS_FAILURE,
                error: e.message
            });

        }
    }

    export const GetSentParcelsAction = () =>  async (dispatch) => {
        dispatch({
            type: GET_SENT_PARCELS,
        });
        try {
            const token = localStorage.getItem('x-access-token');
            const { data } = await axios.get(`users/id/parcels`,{
                headers: {
                  'authorization': token
                }
              });
            if (data.sent) {
                dispatch({
                    type: GET_SENT_PARCELS_SUCCESS,
                    sent: data.sent,
                });
            }
            else {
                dispatch({
                    type: GET_SENT_PARCELS_FAILURE,
                    error: data
                });
            }
        }
        catch (e) {
            dispatch({
                type: GET_SENT_PARCELS_FAILURE,
                error: e.message
            });

        }
    }

    export const GetReceivedParcelsAction = () =>  async (dispatch) => {
        dispatch({
            type: GET_RECEIVED_PARCELS,
        });
        try {
            const token = localStorage.getItem('x-access-token');
            const { data } = await axios.get(`api/receivedparcels`,{
                headers: {
                  'authorization': token
                }
              });
            if (data.received) {
                dispatch({
                    type: GET_RECEIVED_PARCELS_SUCCESS,
                    received: data.received,
                });
            }
            else {
                dispatch({
                    type: GET_RECEIVED_PARCELS_FAILURE,
                    error: data
                });
            }
        }
        catch (e) {
            dispatch({
                type: GET_SENT_PARCELS_FAILURE,
                error: e.message
            });

        }
    }

    export const SendParcelAction = (payload) =>  async (dispatch) => {
        dispatch({
            type: SEND_PARCEL,
            sendParcelBody: payload.sendParcelBody
        });
        try {
            const token = localStorage.getItem('x-access-token');        
            const { data } = await axios.post(`api/parcels`,JSON.parse(payload),{
                headers: {
                  'authorization': token
                }
              });
            if (data.message) {
                dispatch({
                    type: SEND_PARCEL_SUCCESS,
                    isParcelSent: true
                });
            }
            else {
                dispatch({
                    type: SEND_PARCEL_FAILURE,
                    error: data
                });
            }
        }
        catch (e) {
            dispatch({
                type: SEND_PARCEL_FAILURE,
                error: e.message
            });

        }
    }



