class UserRepository {
  constructor(users, date) {
    this.users = users;
    this.dailyUsersActivities = [];
    this.dailyUsersSleep = [];
    this.dailyUsersHydration = [];
  }
  getUser(id) {
    return this.users.find(function(user) {
      return user.id === id;
    })
  }
  calculateAverageStepGoal() {
    const avgStepGoal = this.users.reduce((average, user) => {
       average += user.dailyStepGoal
       return average
    }, 0);
    return Math.round(avgStepGoal/this.users.length);
  }

  calcDailyUserData (date, activityData, sleepData, hydrationData) {
    const dailyActivity = activityData.filter(activity => {
      return activity.date === date;
    });
    const dailySleep = sleepData.filter(sleep => {
      return sleep.date === date;
    });
    const dailyHydration = hydrationData.filter(sleep => {
      return sleep.date === date;
    });
    this.dailyUsersSleep = dailySleep;
    this.dailyUsersActivities = dailyActivity;
    this.dailyUsersHydration = dailyHydration;
  }

  calculateAverageSteps() {
    const dailyUserStepTotal = this.dailyUsersActivities.reduce((stepSum, user) => {
      return stepSum += user.numSteps
    }, 0);
    return Math.round(dailyUserStepTotal/this.dailyUsersActivities.length);
  }

  calculateAverageStairs() {
    const dailyUserStairsTotal = this.dailyUsersActivities.reduce((sumFlights, user) => {
       sumFlights += user.flightsOfStairs
       return sumFlights
    }, 0);
    return Math.round(dailyUserStairsTotal * 12/this.dailyUsersActivities.length);
  }

  calculateAverageMinutesActive() {
    const dailyUsersActiveTotal = this.dailyUsersActivities.reduce((sumMinutes, user) => {
      return sumMinutes += user.minutesActive
    }, 0);
     return Math.round(dailyUsersActiveTotal/this.dailyUsersActivities.length);
  }

  //don't think this is getting used
  //calc average for all users on current day
  //will need to get this working and then display on the UI
  dailyUsersQualityAvg() {
    const sumSleepQuality = this.dailyUsersSleep.reduce((qualitySum, user) => {
      return qualitySum += user.sleepQuality
    }, 0);
    return Number((sumSleepQuality/this.dailyUsersSleep.length).toFixed(1));
  }
  //Also not being used currently
  //can fix this to call the average weekly sleep method when inheritance is used
  //Needs to be displayed on UI as a number of sleeprs who got > 3
  findBestSleepers(date, sleepData) {
    //need to return all users's sleep data for a week
    //iterate the sleepData and pass in a date
    //filter the sleep data by this date, and return all user's data for that date
    // do this 6 more times for consecutive days
    return this.users.filter(user => {
      return user.calculateAverageQualityThisWeek(date) > 3;
    })
  }
  //display needs to be altered to inlcude just this name or multiples
  dailyLongestSleepers() {
    const sortedSleepers = this.dailyUsersSleep.sort((sleeperA, sleeperB) => {
      return sleeperB.hoursSlept - sleeperA.hoursSlept
    });
    const allLongestSleepers = sortedSleepers.filter(sleeper => {
      return sleeper.hoursSlept === sortedSleepers[0].hoursSlept
    });
    return allLongestSleepers;
  }

  calculateAverageDailyWater() {
    const averageOuncesTotal = this.dailyUsersHydration.reduce((sumOunces, user) => {
      return sumOunces += user.numOunces;
    }, 0);
    return Math.round(averageOuncesTotal/this.dailyUsersHydration.length);
  }
}

export default UserRepository;
