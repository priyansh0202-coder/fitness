import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../services/Firebase';

function WorkoutLog() {
    const [workout, setWorkout] = useState('');
    const [workoutLogs, setWorkoutLogs] = useState([]);

    const handleAddWorkout = async () => {
        if (workout) {
            const user = auth.currentUser;
            const db = getFirestore();
            await addDoc(collection(db, 'workouts'), {
                workout,
                uid: user.uid,
                timestamp: serverTimestamp(),
            });
            setWorkout('');
        }
    };

    useEffect(() => {
        const db = getFirestore();
        const q = query(
            collection(db, 'workouts'),
            where('uid', '==', auth.currentUser.uid),
            orderBy('timestamp', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setWorkoutLogs(logs);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Log Your Workouts</h2>
            <input
                type="text"
                value={workout}
                onChange={(e) => setWorkout(e.target.value)}
                placeholder="Workout"
            />
            <button onClick={handleAddWorkout}>Add Workout</button>
            <ul>
                {workoutLogs.map(log => (
                    <li key={log.id}>{log.workout}</li>
                ))}
            </ul>
        </div>
    );
}

export default WorkoutLog;
