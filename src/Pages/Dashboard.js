import React from 'react';
import WorkoutLog from '../components/WorkoutLog';
import ProgressChart from '../components/ProgressChart';
import SetGoals from '../components/SetGoals';
import Reminder from '../components/Reminder';

function Dashboard() {
    return (
        <div>
            <WorkoutLog />
            <ProgressChart />
            <SetGoals />
            <Reminder />
        </div>
    );
}

export default Dashboard;
