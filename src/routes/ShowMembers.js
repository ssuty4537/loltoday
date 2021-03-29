import { React, useEffect, useState } from "react";
import { dbService } from "firebaseApp";
import style from "components/Figure.module.css";

const ShowMembers = () => {
  const [membersObj, setMembersObj] = useState([]);

  useEffect(() => {
    console.log(523523632672 % (60000 * 60 * 24));
    dbService
      .collection("lolTime")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          const membersObj = {
            //표준시간 보정
            ...doc.data(),
            id: doc.id,
            start:
              (doc.data().startTimeParse - doc.data().createdDate) /
                (60000 * 60) +
              9,

            end:
              (doc.data().endTimeParse - doc.data().createdDate) /
                (60000 * 60) +
              9,
          };
          setMembersObj((prev) => [membersObj, ...prev]);
          console.log(membersObj);
        });
      });
  }, []);

  return (
    <>
      {membersObj.map((obj) => (
        <div className={style.container} key={obj.id}>
          <div className={style.nickName}>{obj.lolNickName}</div>
          <div className={style.itemTime}>
            {obj.startTime.substring(11, 16)}
          </div>
          <div className={style.itemTime}>{obj.endTime.substring(11, 16)} </div>
        </div>
      ))}
    </>
  );
};
export default ShowMembers;
