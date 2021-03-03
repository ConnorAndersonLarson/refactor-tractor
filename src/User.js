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
    this.accomplishedDays = [];
    this.friendsNames = [];
    this.friendsActivityRecords = []
  }
  getFirstName() {
    var names = this.name.split(' ');
    return names[0].toUpperCase();
  }

  findFriendsNames(users) {
    this.friends.forEach(friend => {
      this.friendsNames.push(users.find(user => user.id === friend).getFirstName());
    })
  }
  calculateTotalStepsThisWeek(todayDate) {
    this.totalStepsThisWeek = (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0));
  }
  findFriendsTotalStepsForWeek(users, date) {
    this.friends.map(friend => {
      let matchedFriend = users.find(user => user.id === friend);
      matchedFriend.calculateTotalStepsThisWeek(date);
      this.friendsActivityRecords.push(
        {
          'id': matchedFriend.id,
          'firstName': matchedFriend.name.toUpperCase().split(' ')[0],
          'totalWeeklySteps': matchedFriend.totalStepsThisWeek
        })
    })
    this.calculateTotalStepsThisWeek(date);
    this.friendsActivityRecords.push({
      'id': this.id,
      'firstName': 'YOU',
      'totalWeeklySteps': this.totalStepsThisWeek
    });
    this.friendsActivityRecords = this.friendsActivityRecords.sort((a, b) => b.totalWeeklySteps - a.totalWeeklySteps);
  }
  updateRecord(healthData, healthRecord) {
    const currentData = healthData.filter(healthItem => {
      return this.id === healthItem.userID;
    })
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
