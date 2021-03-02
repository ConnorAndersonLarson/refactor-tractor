import Hydration from './Hydration';
// import Sleep from "./Sleep";

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
    this.hydration = new Hydration(this.id, date); 
  }
  getFirstName() {
    var names = this.name.split(' ');
    return names[0].toUpperCase();
  }

  // findClimbingRecord() {
  //   return this.activityRecord.sort((a, b) => {
  //     return b.flightsOfStairs - a.flightsOfStairs;
  //   })[0].flightsOfStairs;
  // }
  // calculateDailyCalories(date) {
  //   let totalMinutes = this.activityRecord.filter(activity => {
  //     return activity.date === date
  //   }).reduce((sumMinutes, activity) => {
  //     return sumMinutes += activity.minutesActive
  //   }, 0);
  //   return Math.round(totalMinutes * 7.6);
  // }

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
  updateRecord(healthData, record) {
    const currentData = healthData.filter(healthItem => {
      return this.id === healthItem.userID;
    })
    currentData.forEach(dataItem => {
     record.unshift(dataItem);
   });
  }

  findTodayData(healthData) {
  const todaysData = healthData.find(healthItem => {
    return this.id === healthItem.userID && this.date === healthItem.date;
  }) 
  return todaysData; 
  }

  findWeeklyData(date, healthRecord) {
    const currentDateIndex = healthRecord.findIndex(dataItem => {
      return dataItem.date === date; 
    });
    const currentWeekData = healthRecord.slice(currentDateIndex, currentDateIndex + 7); 
    return currentWeekData;   
  }
  
  calcAverage(healthData, total, decimalPlace) {
    return Number((healthData/total).toFixed(decimalPlace));
  }
}

export default User;
