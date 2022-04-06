import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import UpdateUser from '../UpdateUser/UpdateUser';
import css from './UserRecords.css';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUserAction } from '../../Redux/Actions/DeleteUserAction';
import { useEffect } from 'react';
import { useState } from 'react';
import { GetUsersAction } from '../../Redux/Actions/UsersActions';
import notifySuccess from "../../Helpers/notifySuccess";
import notifyFailure from "../../Helpers/notifyFailure";
import { GET_ALL_USERS } from '../../Redux/Constants';




export default function UserRecords() {
    const navigate = useNavigate();    
    const allUsers = useSelector(state => state.allUsers);
    const error = useSelector(state => state.error);
    console.log("all users ", allUsers,"error, ", error);

    const deleteUser = (user) => {
        if (user.is_deleted !== 1) {
            user.is_deleted = 1;
        }
        fetch("http://localhost:4000/deleteuser",
            {
                method: "DELETE",
                headers:
                    { "content-type": "application/json", 'authorization': localStorage.getItem('x-access-token') },
                body: JSON.stringify({ 'id':user.id, 'is_deleted':user.is_deleted })
            })
            .then(res => res.json())
            .then(data => {
                if(data.err){
                    notifyFailure(data.err);
                }
                else{
                    notifySuccess(data.message);
                    dispatch(DeleteUserAction({ 'id' : user.id,'is_deleted':user.is_deleted}));
                }
            })
            .catch(e => {
                console.log(e.message);
                notifyFailure(e.message);
            })
    
    }
    useEffect(() => {
        if(error.err){       
            notifyFailure(error.err);
        }
        dispatch({
            type: GET_ALL_USERS,
            error: ""
        });        

    },[error]);
    
   
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchUsers() {            
            dispatch(GetUsersAction())
        }
        fetchUsers();
    }, []);

    return (allUsers ? (allUsers.length > 0 ?
        allUsers.map((user) => {

            return (
                <div className="record" key={user.id}>
                    <h4>{user.username}</h4>
                    <i onClick={() => {
                        navigate("/updateuser", { state: { id:user.id } })
                    }}><FaEdit /></i>
                    <i onClick={() => { 
                        deleteUser(user);                       
                        
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