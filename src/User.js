 class User {
  constructor(userData, date) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.date = date;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
    this.friendsSteps = []; 
    this.friendsWeeklyActivityRecords = []
  }
  getFirstName() {
    var names = this.name.split(' ');
    return names[0].toUpperCase();
  }
  
  findWeeklyFriendActivityData(activityData, date) {
    const friendActivityRecords = activityData.reduce((friendRecords, dataItem) => {
      this.friends.forEach(friendId => {
        if(!friendRecords[friendId] && dataItem.userID === friendId) {
            friendRecords[friendId] = [dataItem];
      } else if(dataItem.userID === friendId) {
            friendRecords[friendId].unshift(dataItem); 
        }
        });
        return friendRecords; 
    }, {});
    Object.values(friendActivityRecords).forEach(record => {
     this.friendsWeeklyActivityRecords.push(this.findWeeklyData(date, record))
    });
  }

  calcFriendsWeeklyStepAvg() {
    this.friendsWeeklyActivityRecords.forEach(record => {
     const avgSteps = record.reduce((steps, day) => {
       steps += day.numSteps;
       return steps; 
     }, 0);
     const friendsStepInfo = {id: 0, totalWeeklySteps: 0};
     friendsStepInfo.id = record[0].userID;
     friendsStepInfo.totalWeeklySteps = this.calcAverage(avgSteps, 7, 0); 
     this.friendsSteps.push(friendsStepInfo);
    });
  }

  updateRecord(healthData, healthRecord) {
    const currentData = healthData.filter(healthItem => {
      return this.id === healthItem.userID;
    });
    currentData.sort((dataItemA, dataItemB) => {
      return dataItemA.date - dataItemB.date;
   });
    currentData.forEach(dataItem => healthRecord.unshift(dataItem));  
  }

  findTodayData(healthRecord) {
  const todaysData = healthRecord.find(healthItem => {
    return this.id === healthItem.userID && this.date === healthItem.date;
  }) 
    if(!todaysData) {
      return healthRecord[0]
  } else {
    return todaysData; 
  }
  }

  findWeeklyData(date, healthRecord) {
    let currentDateIndex = healthRecord.findIndex(dataItem => {
      return dataItem.date === date; 
    });
    if(currentDateIndex === -1) {
      currentDateIndex = 0; 
    } 
    const currentWeekData = healthRecord.slice(currentDateIndex, currentDateIndex + 7); 
    return currentWeekData; 
  }
  
  calcAverage(healthData, total, decimalPlace) {
    return Number((healthData/total).toFixed(decimalPlace));
  }
}

export default User;
