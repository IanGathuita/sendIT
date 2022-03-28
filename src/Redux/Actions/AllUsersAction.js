import { ALL_USERS} from "../Constants";

export function AllUsersAction(payload){
    return {
        type: ALL_USERS,
        allUsers :payload.allUsers
    }
}
