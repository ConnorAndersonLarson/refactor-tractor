class Activity {
  constructor(userID, date, stepGoal) {
    this.userID = userID;
    this.date = date;
    this.steps = 0;
    this.dailyStepGoal = stepGoal; 
    this.minutesActive = 0;
    this.flightsOfStairs = 0;
    this.milesWalked = 0;
    this.reachedStepGoal = null;
    this.activityRecord = [];
    this.accomplishedDays = [];

  findTodayActivityData(activityData) {
    const todaysData = activityData.find(activity => {
      return this.userID === activity.userID && this.date === activity.date
    })
    this.steps = todaysData.numSteps;
    this.minutesActive = todaysData.minutesActive; 
    this.flightsOfStairs = todaysData.flightsOfStairs; 
  }

  updateActivities(activityData) {
     activityData.forEach(activity => {
      this.activityRecord.unshift(activity);
      if (activity.numSteps >= this.dailyStepGoal) {
        this.accomplishedDays.unshift(activity.date);
      }
    });
  }
  calculateMiles(userRepository) {
    let walkingUser = userRepository.users.find(user => {
      return user.id === this.userId;
    });
    return Math.round(this.steps * walkingUser.strideLength / 5280).toFixed(1);
  }
  compareStepGoal(userRepository) {
    let userStepGoal = userRepository.users.find(user => {
      return user.id === this.userId;
    }).dailyStepGoal;
    this.reachedStepGoal = this.steps >= userStepGoal;
  }
}

export default Activity;
