import { RECEIVED_PARCELS } from "../Constants";

export function ReceivedParcelsAction(payload){
    return {
        type: RECEIVED_PARCELS,
        receivedParcels:payload.sentParcels
    }
}