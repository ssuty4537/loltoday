import React, { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "firebaseApp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserData(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return <AppRouter isLoggedIn={isLoggedIn} userData={userData} />;
}
export default App;
