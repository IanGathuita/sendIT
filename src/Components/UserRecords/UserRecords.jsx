import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import UpdateUser from '../UpdateUser/UpdateUser';
import css from './UserRecords.css';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUserAction } from '../../Redux/Actions/DeleteUserAction';
import { useEffect } from 'react';
import { AllUsersAction } from '../../Redux/Actions/AllUsersAction';
import { useState } from 'react';
import notifySuccess from "../../Helpers/notifySuccess";
import notifyFailure from "../../Helpers/notifyFailure";

const deleteUser = (id, is_deleted) => {
    if (is_deleted !== 1) {
        is_deleted = 1;
    }
    fetch("/deleteuser",
        {
            method: "DELETE",
            headers:
                { "content-type": "application/json", 'x-access-token': localStorage.getItem('x-access-token') },
            body: JSON.stringify({ id, is_deleted })
        })
        .then(res => res.json())
        .then(data => {
            if(data.err){
                notifyFailure(data.err);
            }
            else{
                notifySuccess(data.message);
            }
        })
        .catch(e => {
            console.log(e.message);
            notifyFailure(e.message);
        })

}


export default function UserRecords() {
    const navigate = useNavigate();

    
    const allUsers = useSelector(state => state.allUsers);
    //a value that changes when an item is deleted hence refreshing the page
    const [refresh,setRefresh] = useState(0);



    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchUsers() {
            let response = await fetch('/api/users', {
                headers:
                    { "content-type": "application/json", 'x-access-token': localStorage.getItem('x-access-token') }
            });
            let allUsers = await response.json();

            dispatch(AllUsersAction({ "allUsers": allUsers.users }))
            console.log(allUsers);
        }
        fetchUsers();
    }, [refresh]);

    return (allUsers ? (allUsers.length > 0 ?
        allUsers.map((user) => {

            return (
                <div className="record" key={user.id}>
                    <h4>{user.username}</h4>
                    <i onClick={() => {
                        navigate("/updateuser", { state: { id:user.id } })
                    }}><FaEdit /></i>
                    <i onClick={() => {
                        deleteUser(user.id, user.is_deleted);
                        dispatch(DeleteUserAction({ id : user.id}));
                        setRefresh(refresh +1)
                        
                    }}><FaTrash /></i>
                    {/* <button className='btnWithIcon'>View user<FaChevronRight/></button> */}
                </div>
            );

        })
        :
        <h3>No users to display</h3>
    )
        :
        <h3>Please log in to view all users</h3>
    );




}