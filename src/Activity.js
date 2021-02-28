import User from './User';

class Activity extends User {
  constructor(userData, date) {
    super(userData, date); 
    this.steps = 0;
    this.minutesActive = 0;
    this.flightsOfStairs = 0;
    this.milesWalked = 0;
    this.weeklyAverageActive = 0; 
    this.weeklyAverageSteps = 0; 
    this.reachedStepGoal = null;
    this.activityRecord = [];
    this.accomplishedDays = [];
    this.trendingStepDays = [];
    this.trendingStairsDays = [];
  }
    
  findTodayActivityData(activityData) {
    const todaysData = activityData.find(activity => {
      return this.id === activity.userID && this.date === activity.date
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
  
  calculateMiles() {
    return Math.round(this.steps * this.strideLength / 5280).toFixed(1);
  }

  calcWeeklyAverageActive(date) {
    const currentDateIndex = this.activityRecord.findIndex(activity => {
      return activity.date === date; 
    });
    const currentWeekData = this.activityRecord.slice(currentDateIndex, currentDateIndex + 7); 
    const averageWeeklyData = currentWeekData.reduce((weeklyAverage, day) => {
      if(!weeklyAverage.steps) {
       weeklyAverage.steps = day.numSteps;
       weeklyAverage.minutesActive = day.minutesActive; 
    } else {
       weeklyAverage.steps += day.numSteps;
       weeklyAverage.minutesActive += day.minutesActive; 
    }   
       return weeklyAverage; 
    }, {}); 
    this.weeklyAverageSteps = Number((averageWeeklyData.steps/7).toFixed(0))
    this.weeklyAverageActive = Number((averageWeeklyData.minutesActive/7).toFixed(0))
  }
  //don't see where this is getting used 
  compareStepGoal() {
    return this.reachedStepGoal = this.dailyStepGoal >= this.steps
  }

  //find all time stair climbing record instead of trending days here
  findMostFlightsClimbed() {
    const sortedStairs = this.activityRecord.sort((activityA, activityB) => {
      return activityA.flightsOfStairs - activityB.flightsOfStairs
    })
    return sortedStairs[sortedStairs.length - 1].flightsOfStairs
  }
  //find all the days where they exceeded their step goal and list # of days
  findGoalMatchDays() {
    const positiveDays = this.activityRecord.filter(activity => {
      return activity.numSteps >= this.dailyStepGoal; 
    });
    return positiveDays.length
  }
  calcAvgWeeklyFlights(date) {
    const currentDateIndex = this.activityRecord.findIndex(activity => activity.date === date);
    const currentWeekData = this.activityRecord.slice(currentDateIndex, currentDateIndex + 7); 
    const averageWeeklyFlights = currentWeekData.reduce((average, day) => {
        return average += day.flightsOfStairs;
    }, 0)
    return Number((averageWeeklyFlights/7).toFixed(1)); 

  }
}

export default Activity;
