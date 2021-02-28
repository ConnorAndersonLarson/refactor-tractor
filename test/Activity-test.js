import { expect } from 'chai'
import Activity from '../src/Activity';
// import UserRepository from '../src/UserRepository';
import User from '../src/User';
import activityData from '../src/data/activity-test-data'; 

describe.only('Activity', function() {
  let user1, user2, activity1, activity2, date;
  beforeEach(() => {
    date = "2019/03/05";
    user1 = new User({
      'id': 1,
      'name': 'Luisa Hane',
      'address': '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      'email': 'Diana.Hayes1@hotmail.com',
      'strideLength': 4.3,
      'dailyStepGoal': 10000,
      'friends': [
        16,
        4,
        8
      ]
    });
    user2 = new User({
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 2000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    })
  
    activity1 = new Activity(user1, date);
    activity2 = new Activity(user2, date);
  });
  it('should be a function', function() {
    expect(Activity).to.be.a('function');
  });
  it('should be an instance of activity', function() {
    expect(activity1).to.be.an.instanceof(Activity);
  });
  it('should hold a user id, and date', function() {
    expect(activity1.id).to.equal(1);
    expect(activity1.date).to.equal("2019/03/05");
  });
  it('should have a default value for reached step goal', function() {
    expect(activity1.reachedStepGoal).to.equal(false);
  });
  it('should have a default activity record', function() {
    expect(activity1.activityRecord).to.deep.equal([]);
  });
  describe('Activity Methods', function () {
    it('should find a user\'s steps, minutes active, and flights climbed', function() {
      activity1.findTodayActivityData(activityData); 

      expect(activity1.steps).to.equal(5144);
      expect(activity1.minutesActive).to.equal(282);
      expect(activity1.flightsOfStairs).to.equal(16);
    });
    it('should update a user\'s activityRecord', function () {
      const userActivityData = activityData.filter(activity => {
        return user1.id === activity.userID;
      })
      activity1.updateActivities(userActivityData);
      expect(activity1.activityRecord.length).to.equal(14); 
      expect(activity1.activityRecord[0]).to.deep.equal({
        "userID": 1,
        "date": "2019/03/06",
        "numSteps": 13532,
        "minutesActive": 34,
        "flightsOfStairs": 30
      });
    }); 
    it('should have a method that calculate miles walked', function() {
      activity1.findTodayActivityData(activityData); 
      const miles = activity1.calculateMiles();
      expect(miles).to.equal(4.2);
    });
    it('should have a method that return the highest climbing record', function() {
      const userActivityData = activityData.filter(activity => {
        return user1.id === activity.userID;
      })
      activity1.updateActivities(userActivityData);
      const numFlights = activity1.findMostFlightsClimbed(); 

      expect(numFlights).to.equal(46)
    });
    it('should calculate weekly average step count', function() {
      const userActivityData = activityData.filter(activity => {
        return user1.id === activity.userID;
      })
      activity1.updateActivities(userActivityData);
      activity1.calcWeeklyAverageActive(date); 

      expect(activity1.weeklyAverageSteps).to.equal(7780)
    });
    it('should calculate weekly average minutes active', function() {
      const userActivityData = activityData.filter(activity => {
        return user1.id === activity.userID;
      })
      activity1.updateActivities(userActivityData);
      activity1.calcWeeklyAverageActive(date); 

      expect(activity1.weeklyAverageActive).to.equal(155)
    });
    it('should calculate weekly average flights of stairs climbed', function() {
      const userActivityData = activityData.filter(activity => {
        return user1.id === activity.userID;
      })
      activity1.updateActivities(userActivityData);
      const averageFlights = activity1.calcAvgWeeklyFlights(date); 

      expect(averageFlights).to.equal(30)
    });

    it('should count the number of days step goal was reached', function() {
      const userActivityData = activityData.filter(activity => {
        return user1.id === activity.userID;
      })
      activity1.updateActivities(userActivityData);
      const positiveDays = activity1.findGoalMatchDays(); 

      expect(positiveDays).to.equal(5);
    });
    
    it('should return false if goal isn\'t met', function() {
      activity1.findTodayActivityData(activityData); 
      activity1.compareStepGoal();

      expect(activity1.reachedStepGoal).to.equal(false);
    });
    it('should return true if goal is met', function() {
      activity2.findTodayActivityData(activityData); 
      activity2.compareStepGoal();
      
      expect(activity2.reachedStepGoal).to.equal(true);
    });
  });
});
