import { authService, dbService } from "firebaseApp";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const TimeInput = ({ userData }) => {
  const [lolNickName, setLolNickName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const startTimeConvert = startTime.toString().replace(/T/, " ").concat(":00");
  const startTimeParse = Date.parse(startTimeConvert);
  const endTimeConvert = endTime.toString().replace(/T/, " ").concat(":00");
  const endTimeParse = Date.parse(endTimeConvert);
  const subtractTime = (endTimeParse - startTimeParse) / 60000;
  console.log(subtractTime, startTimeParse, endTimeParse);

  const onChange = (e) => {
    const { value, id } = e.target;
    if (id === "startTime") setStartTime(value);
    else if (id === "endTime") setEndTime(value);
    else if (id === "lolNickName") setLolNickName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("lolTime").add({
      createdAt: Date.now(),
      userId: userData.uid,
      userEmail: userData.email,
      lolNickName: lolNickName,
      startTime: startTime,
      endTime: endTime,
    });
    setLolNickName("");
    onClickMatching();
  };

  const onSignOut = () => {
    //log out 기능
    authService.signOut();
  };

  const history = useHistory();
  const onClickMatching = () => {
    //react-route-dom 에서 history 기능 제공
    history.push("/matching");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={onChange}
          ></input>
          <input
            id="endTime"
            type="datetime-local"
            value={endTime}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <input
            id="lolNickName"
            type="text"
            placeholder="소환사명"
            value={lolNickName}
            onChange={onChange}
          ></input>
          <input type="submit" value=".time"></input>
        </div>
      </form>
      <div>
        <button onClick={onSignOut}>Log Out</button>
      </div>
    </div>
  );
};
export default TimeInput;
