import { ALL_PARCELS} from "../Constants";

export function AllParcelsAction(payload){
    return {
        type: ALL_PARCELS,
        allParcels :payload.allParcels
    }
}