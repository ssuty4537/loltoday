import { authService, dbService } from "firebaseApp";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [timeList, setTimeList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const onChange = (e) => {
    const { value, id } = e.target;
    if (id === "hour") {
      setHour(value);
    } else if (id === "minute") setMinute(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("lolTime").add({ hour, minute });
    setHour("");
    setMinute("");
    setTimeList([]); //onSubmit 할 때마다 timeList 초기화
    setIsUpdated((prev) => !prev);
  };

  const viewLolTime = async () => {
    const dbLolTime = await dbService.collection("lolTime").get();
    dbLolTime.forEach((document) => {
      setTimeList((prev) => [document.data(), ...prev]);
    });
  };

  useEffect(() => {
    viewLolTime();
  }, [isUpdated]); //submit 이 바뀔 때마다 업데이트한다

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
        {timeList.map((document) => (
          <div>
            {document.hour}:{document.minute}
          </div>
        ))}
      </div>

      <div>
        <button onClick={onClickProfile}>Profile</button>
        <button onClick={onSignOut}>Log Out</button>
      </div>
    </div>
  );
};
export default Home;
