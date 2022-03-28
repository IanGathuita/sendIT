import { useState } from "react";
import { useSelector } from "react-redux";

import AllUsers from "../AllUsers/AllUsers";
import AllParcels from "../AllParcels/AllParcels";

function handleTabsClick(e){
    if(e.target.classList.contains('all-users')){
        e.target.classList.add('active-tab');
        e.target.nextElementSibling.classList.remove('active-tab');
    }
    else{
        e.target.classList.add('active-tab');
        e.target.previousElementSibling.classList.remove('active-tab');
    }
    
}

const AdminDashboard = () => {
    const loginStatus = useSelector(state => state.loggedIn);
    const [onUsersTab,setOnUsersTab] = useState(true);
    let tabToDisplay = onUsersTab ?  <AllUsers></AllUsers> :<AllParcels></AllParcels>;
    return(
        loginStatus? 
        <section>
            <h1>Admin dashboard</h1>
            <p>You can view all the users and parcels on this page. You can also edit and/or delete them.
            </p>
            <div className="tabs">
                <h4 className = "active-tab all-users" onClick={(e) => { setOnUsersTab(true); handleTabsClick(e)}}> Users</h4>
                <h4  className = "all-parcels" onClick={(e) => { setOnUsersTab(false); handleTabsClick(e)}}>Parcels</h4>
            </div>
            <div className="records">
                {tabToDisplay}
            </div>
        </section> 
        :
        <section>
            <h2>Please log in as an admin to access the dashboard</h2>
        </section> 
    );

}
export default AdminDashboard;