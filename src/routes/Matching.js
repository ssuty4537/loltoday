import { React, useState, useEffect } from "react";
import { dbService } from "firebaseApp";

const Matching = () => {
  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    dbService.collection("lolTime").onSnapshot((snapshot) => {
      const timeArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTimeList(timeArray);
    });
  }, []);

  return (
    <>
      <div>
        {timeList.map((doc) => (
          <div>
            {doc.lolNickName} : {doc.startTime} - {doc.endTime}
          </div>
        ))}
      </div>
    </>
  );
};

export default Matching;
