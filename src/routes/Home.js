import { authService, dbService } from "firebaseApp";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home = ({ userData }) => {
  const [lolNickName, setLolNickName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeList, setTimeList] = useState([]);

  const onChange = (e) => {
    const { value, id } = e.target;
    if (id === "startTime") setStartTime(value);
    else if (id === "endTime") setEndTime(value);
    else if (id === "lolNickName") setLolNickName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("lolTime").add({
      userId: userData.uid,
      userEmail: userData.email,
      lolNickName: lolNickName,
      startTime: startTime,
      endTime: endTime,
    });
    setLolNickName("");
    setStartTime("");
    setEndTime("");
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
      <form onSubmit={onSubmit}>
        <div>
          <input
            id="lolNickName"
            type="text"
            placeholder="소환사명"
            value={lolNickName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={onChange}
          ></input>
          <input
            id="endTime"
            type="time"
            value={endTime}
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
            <div>
              {doc.lolNickName} {doc.startTime} - {doc.endTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
