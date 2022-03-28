import { SENT_PARCELS } from "../Constants";

export function SentParcelsAction(payload){
    return {
        type: SENT_PARCELS,
        sentParcels:payload.sentParcels
    }
}