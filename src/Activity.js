import User from './User';

class Activity extends User {
  constructor(userData, date) {
    super(userData, date); 
    this.steps = 0;
    this.minutesActive = 0;
    this.flightsOfStairs = 0;
    this.weeklyAverageActive = 0; 
    this.weeklyAverageSteps = 0; 
    this.reachedStepGoal = false;
    this.activityRecord = [];
  }
    
  findTodayActivityData(activityData) {
    const todaysData = this.findTodayData(activityData); 
    this.steps = todaysData.numSteps;
    this.minutesActive = todaysData.minutesActive; 
    this.flightsOfStairs = todaysData.flightsOfStairs; 
  }

  calculateMiles() {
    return Number(((this.steps * this.strideLength) / 5280).toFixed(1));
  }

  calcWeeklyAverageActive() {
    const lastWeekData = this.findWeeklyData(this.date, this.activityRecord);
      const averageWeeklyData = {steps: 0, minutesActive: 0};
      lastWeekData.forEach(day => {
        averageWeeklyData.steps += day.numSteps;
        averageWeeklyData.minutesActive += day.minutesActive;
    });
    this.weeklyAverageSteps = this.calcAverage(averageWeeklyData.steps, 7, 0); 
    this.weeklyAverageActive = this.calcAverage(averageWeeklyData.minutesActive, 7, 0); 
  }
  //don't see where this is getting used 
  compareStepGoal() {
    return this.reachedStepGoal = this.steps >= this.dailyStepGoal;
  }

  //find all time stair climbing record instead of trending days here
  findMostFlightsClimbed() {
    const sortedStairs = this.activityRecord.sort((activityA, activityB) => {
      return activityA.flightsOfStairs - activityB.flightsOfStairs
    });
    return sortedStairs[sortedStairs.length - 1].flightsOfStairs;
  }
  //find all the days where they exceeded their step goal and list # of days
  findGoalMatchDays() {
    const positiveDays = this.activityRecord.filter(activity => {
      return activity.numSteps >= this.dailyStepGoal; 
    });
    return positiveDays.length;
  }

  calcAvgWeeklyFlights(date) {
    const currentWeekData = this.findWeeklyData(this.date, this.activityRecord); 
    const averageWeeklyFlights = currentWeekData.reduce((average, day) => {
        return average += day.flightsOfStairs;
    }, 0); 
    return this.calcAverage(averageWeeklyFlights, 7, 0); 
  }
}

export default Activity;
