import { authService, dbService } from "firebaseApp";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home = ({ userData }) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [timeList, setTimeList] = useState([]);

  const onChange = (e) => {
    const { value, id } = e.target;
    if (id === "hour") {
      setHour(value);
    } else if (id === "minute") setMinute(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("lolTime").add({
      userId: userData.uid,
      userEmail: userData.email,
      hour: hour,
      minute: minute,
    });
    setHour("");
    setMinute("");
  };

  useEffect(() => {
    //foreach 구문과 다르게 onSnapshot 실시간 반영 가능
    dbService.collection("lolTime").onSnapshot((snapshot) => {
      const timeArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTimeList(timeArray);
    });
  }, []);

  const onSignOut = () => {
    //log out 기능
    authService.signOut();
  };

  const history = useHistory();
  const onClickProfile = () => {
    //react-route-dom 에서 history 기능 제공
    history.push("/profile");
  };

  return (
    <div>
      <div>Home</div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            id="hour"
            type="number"
            placeholder="Hour"
            min="0"
            max="23"
            value={hour}
            onChange={onChange}
          ></input>
          <input
            id="minute"
            type="number"
            placeholder="Minute"
            min="0"
            max="59"
            value={minute}
            onChange={onChange}
          ></input>
          <input type="submit" value=".time"></input>
        </div>
      </form>
      <div>
        <button onClick={onClickProfile}>Profile</button>
        <button onClick={onSignOut}>Log Out</button>
      </div>
      <div>
        {timeList.map((doc) => (
          <div key={doc.id}>
            {doc.hour}:{doc.minute}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
