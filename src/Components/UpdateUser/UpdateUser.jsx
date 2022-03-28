import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import notifySuccess from "../../Helpers/notifySuccess";
import notifyFailure from "../../Helpers/notifyFailure";


export default function UpdateUser(props){
    const location = useLocation();
    const id = location.state.id;
    let userToEdit;
    const allUsers = useSelector(state => state.allUsers);
   
    if(allUsers){
        function getUserToEdit(allUsers, userId){
            const userToEdit = allUsers.filter(user => user.id == userId);
            return userToEdit[0];
        }
        userToEdit = getUserToEdit(allUsers,id);
    }
    
    const [user,setUser] = useState({
        id,
        full_name: userToEdit.full_name,
        username: userToEdit.username,
        phone_number: userToEdit.phone_number,
        email: userToEdit.email,
        is_admin: userToEdit.is_admin,
        is_deleted: userToEdit.is_deleted,
        is_sent:userToEdit.is_sent,
        password:userToEdit.password


    });    

    return(
        <section>
            <h2>Update user</h2>
            <form className='form-desktop'>
            <label>Full name</label><br></br>
                    <input id="full_name" value={user.full_name} onChange={ (e) => {
                        setUser({...user, full_name : e.target.value})
                    }}></input><br></br>
                    <label>username</label><br></br>
                    <input id="username" value={user.username} onChange={ (e) => {
                        setUser({...user, username : e.target.value})
                    }}></input><br></br>
                    <label>Phone number</label><br></br>
                    <input id="number" value={user.phone_number} onChange={ (e) => {
                        setUser({...user, phone_number : e.target.value})
                    }}></input><br></br>
                    <label>Email</label><br></br>
                    <input id="email" value={user.email} onChange={ (e) => {
                        setUser({...user, email: e.target.value})
                    }}></input><br></br>
                    <label>Is deleted</label><br></br>
                    <input id="is_deleted"  value={user.is_deleted} onChange={ (e) => {
                        setUser({...user, is_deleted : e.target.value})
                    }}></input><br></br>
                    <label>Is admin</label><br></br>
                    <input id="is_admin" type="text" value={user.is_admin} onChange={ (e) => {
                        setUser({...user, is_admin : e.target.value})
                    }}></input><br></br>
                    <button onClick={
                        (e) => {
                            e.preventDefault();
                            fetch('/api/updateuser', {
                                method:"PUT",
                                headers:
                                    { "content-type": "application/json", 'x-access-token': localStorage.getItem('x-access-token') },
                                 body: JSON.stringify(user)
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
                            });
                        }

                    }>Update user</button>

            </form>           
        </section>
    )
}