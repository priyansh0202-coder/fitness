import React, { useState } from 'react';
import "../Auth.css";
import { auth } from '../services/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Dashboard from '../Pages/Dashboard';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Sign Up successfully");
        } catch (error) {
            console.log('Error signing up:', error);
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged In");
            setLoggedIn(true);
        } catch (error) {
            console.log('Error logging in:', error);
        }
    };

    if (loggedIn) {
        return <Dashboard />;
    }

    return (
        <div className="auth-container">
            <h2>Sign Up / Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleSignup}>Sign Up</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
