import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getFirestore, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from '../services/Firebase';

function ProgressChart() {
    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const workoutsRef = collection(db, 'workouts');

        const q = query(
            workoutsRef,
            where('uid', '==', auth.currentUser.uid),
            orderBy('timestamp')
        );


        const unsubscribe = onSnapshot(q, snapshot => {
            const data = snapshot.docs.map(doc => doc.data());
            setProgressData(data);
            console.log(setProgressData, "progress")
        });

        return () => unsubscribe();
    }, []);

    const chartData = {
        labels: progressData.map((_, i) => `Day ${i + 1}`),
        datasets: [
            {
                label: 'Workout Progress',
                data: progressData.map(log => log.workout.length),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            }
        ],
    };

    return (
        <div>
            <h2>Progress Chart</h2>
            {progressData.length > 0 ? (
                <Line data={chartData} />
            ) : (
                <p>No workout data available. Start logging your workouts to see progress!</p>
            )}
        </div>
    );
}

export default ProgressChart;
