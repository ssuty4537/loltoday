import { authService } from "firebaseApp";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
  const onSignOut = () => {
    //log out 기능
    authService.signOut();
  };

  const history = useHistory();
  const onClickProfile = () => {
    //route-dom 에서 history 기능 제공
    history.push("/profile");
  };

  return (
    <div>
      <div>Home</div>
      <button onClick={onClickProfile}>Profile</button>
      <button onClick={onSignOut}>Log Out</button>
    </div>
  );
};
export default Home;
