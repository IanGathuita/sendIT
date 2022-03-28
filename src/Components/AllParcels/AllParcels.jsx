import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { AllParcelsAction } from "../../Redux/Actions/AllParcelsAction";

import ParcelRecords from "../ParcelRecords/ParcelRecords";
export default function AllParcels() {
    const allParcels = useSelector(state => state.allParcels);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchParcels() {
            let response = await fetch('/api/parcels', {
                headers:
                    { "content-type": "application/json", 'x-access-token': localStorage.getItem('x-access-token') }
            });
            let parcels = await response.json();


            dispatch(AllParcelsAction({ "allParcels": parcels.parcels }))
            console.log(parcels.length);
        }
        fetchParcels();
    }, []);
    
    return (
                  

     <ParcelRecords></ParcelRecords>
    )
}