import React, { useState, useEffect } from 'react';
import { auth } from './services/Firebase';
import Auth from "../src/components/Auth"
import Dashboard from './Pages/Dashboard';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? <Dashboard /> : <Auth />}
    </div>
  );
}

export default App;
