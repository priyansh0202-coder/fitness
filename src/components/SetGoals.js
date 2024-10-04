import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from '../services/Firebase'; // Ensure you're importing auth correctly

function SetGoals() {
    const [goal, setGoal] = useState('');
    const [currentGoal, setCurrentGoal] = useState('');

    // Initialize Firestore
    const db = getFirestore();

    const handleSetGoal = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, 'goals', user.uid);
            await setDoc(userDocRef, { goal });
            setGoal('');
        }
    };

    useEffect(() => {
        const fetchGoal = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'goals', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCurrentGoal(docSnap.data().goal);
                }
            }
        };

        fetchGoal();
    }, [db]);

    return (
        <div>
            <h2>Set Your Fitness Goals</h2>
            <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Set Goal"
            />
            <button onClick={handleSetGoal}>Set Goal</button>
            <h3>Current Goal: {currentGoal}</h3>
        </div>
    );
}

export default SetGoals;


