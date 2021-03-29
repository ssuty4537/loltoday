import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onClickHome = () => {
    history.push("/");
  };

  return (
    <div>
      <div>Profile</div>
      <div>
        <button onClick={onClickHome}>Home</button>
      </div>
    </div>
  );
};

export default Profile;
