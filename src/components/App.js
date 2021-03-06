import React, { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "firebaseApp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //AuthState의 상태를 확인하는 method
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  });

  return <AppRouter isLoggedIn={isLoggedIn} />;
}
export default App;
