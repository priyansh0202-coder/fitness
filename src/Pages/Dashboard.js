import React from 'react';
import WorkoutLog from '../components/WorkoutLog';
import ProgressChart from '../components/ProgressChart';
import SetGoals from '../components/SetGoals';
import Reminder from '../components/Reminder';
import { auth } from '../services/Firebase';

function Dashboard() {

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                console.log("User signed out");

                window.location.reload();
            })
            .catch(error => {
                console.error("Error signing out: ", error);
            });
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button style={{ width: "20%", alignItems: "center", backgroundColor: "red" }} onClick={handleLogout}>Logout</button>
            <WorkoutLog />
            <ProgressChart />
            <SetGoals />
            <Reminder />
        </div>
    );
}

export default Dashboard;


