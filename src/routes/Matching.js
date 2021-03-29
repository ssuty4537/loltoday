let gamerNickNameList = [];
function combination(source, target, n, r, count) {
  if (r === 0) gamerNickNameList.push(target);
  else if (n === 0 || n < r) return;
  else {
    target.push(source[count]);
    combination(source, Object.assign([], target), n - 1, r - 1, count + 1);
    target.pop();
    combination(source, Object.assign([], target), n - 1, r, count + 1);
  }
}

combination(nickNameList, [], nickNameList.length, 4, 0);
console.log(gamerNickNameList);
setGamerNickNameList(gamerNickNameList);

let todayMemberList = [];
let gamerObjectList = {};

// for (var i = 0; i < gamerNickNameList.length; i++) {
let list = gamerNickNameList[2];
dbService
  .collection("lolTime")
  .where("lolNickName", "in", list)
  .get()
  .then((result) => {
    let startTimeParseList = [];
    let endTimeParseList = [];
    result.forEach((doc) => {
      startTimeParseList.push(doc.data().startTimeParse);
      endTimeParseList.push(doc.data().endTimeParse);
      gamerObjectList[list] = [
        doc.data().startTimeParse,
        doc.data().endTimeParse,
        doc.data().startTime,
        doc.data().endTime,
      ];
    });
    console.log(gamerObjectList);
    let maxStartTimeParse = max(startTimeParseList);
    let minEndTimeParse = min(endTimeParseList);
    // console.log(list, (minEndTimeParse - maxStartTimeParse) / 60000);

    if ((minEndTimeParse - maxStartTimeParse) / 60000 >= 30) {
      todayMemberList.push(list);
    } else return;
    setTodayMemberList(todayMemberList);
    console.log(todayMemberList, maxStartTimeParse, minEndTimeParse);
  });
// }
