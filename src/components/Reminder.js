import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { auth } from '../services/Firebase';

function Reminder() {
    const [reminder, setReminder] = useState('');
    const [reminders, setReminders] = useState([]);

    const db = getFirestore();

    const handleSetReminder = async () => {
        const user = auth.currentUser;
        if (user) {
            const remindersRef = collection(db, 'reminders');
            await addDoc(remindersRef, {
                reminder,
                uid: user.uid,
                timestamp: serverTimestamp(),
            });
            setReminder('');
        }
    };

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const remindersRef = collection(db, 'reminders');
            const q = query(remindersRef, where('uid', '==', user.uid), orderBy('timestamp', 'desc'));

            const unsubscribe = onSnapshot(q, snapshot => {
                const data = snapshot.docs.map(doc => doc.data());
                setReminders(data);
            });

            return () => unsubscribe();
        }
    }, [db]);

    return (
        <div>
            <h2>Set Workout Reminders</h2>
            <input
                type="text"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                placeholder="Reminder"
            />
            <button onClick={handleSetReminder}>Set Reminder</button>
            <ul>
                {reminders.map((rem, index) => (
                    <li key={index}>{rem.reminder}</li>
                ))}
            </ul>
        </div>
    );
}

export default Reminder;
