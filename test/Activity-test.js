import { expect } from 'chai'
import Activity from '../src/Activity';
import User from '../src/User';
import activityData from '../src/data/activity-test-data'; 

describe('Activity', function() {
  let user1, user2, activity1, activity2, date1, date2;
  beforeEach(() => {
    date1 = '2019/03/05';
    date2 = '2019/03/07';
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
      'id': 2,
      'name': 'Jarvis Considine',
      'address': '30086 Kathryn Port, Ciceroland NE 07273',
      'email': 'Dimitri.Bechtelar11@gmail.com',
      'strideLength': 4.5,
      'dailyStepGoal': 2000,
      'friends': [
        9,
        18,
        24,
        19
      ]
    })
  
    activity1 = new Activity(user1, date1);
    activity2 = new Activity(user2, date2);
  });
  it('should be a function', function() {
    expect(Activity).to.be.a('function');
  });
  it('should be an instance of activity', function() {
    expect(activity1).to.be.an.instanceof(Activity);
  });
  it('should hold a user id, and date', function() {
    expect(activity1.id).to.equal(1);
    expect(activity1.date).to.equal('2019/03/05');
  });
  it('should have a default value for reached step goal', function() {
    expect(activity1.reachedStepGoal).to.equal(false);
  });
  it('should have a default activity record', function() {
    expect(activity1.activityRecord).to.deep.equal([]);
  });
  describe('updateRecord', function () {
    it('should update the activity record with all activity data', function () {
      activity1.updateRecord(activityData, activity1.activityRecord);
      expect(activity1.activityRecord.length).to.equal(14);  
      expect(activity1.activityRecord[0]).to.deep.equal({
        'userID': 1,
        'date': '2019/03/06',
        'numSteps': 13532,
        'minutesActive': 34,
        'flightsOfStairs': 30
      });
    });
  });
  describe('findTodayActivityData', function () {
    it('should find a user\'s steps, minutes active, and flights climbed for a certain date', function() {
      activity1.updateRecord(activityData, activity1.activityRecord); 
      activity1.findTodayActivityData(); 

      expect(activity1.steps).to.equal(5144);
      expect(activity1.minutesActive).to.equal(282);
      expect(activity1.flightsOfStairs).to.equal(16);
    });
    it('should find a user\'s steps, minutes active, and flights climbed of most recent date if date doesn\'t exist', function () {
      activity2.updateRecord(activityData, activity2.activityRecord); 
      activity2.findTodayActivityData(); 

      expect(activity2.steps).to.equal(6945);
      expect(activity2.minutesActive).to.equal(145);
      expect(activity2.flightsOfStairs).to.equal(0);
    });
  }); 
  describe("findWeeklyData", function () {
    it('should calculate weekly average step count, and minutes active', function() {
      
      activity1.updateRecord(activityData, activity1.activityRecord);
      activity1.calcWeeklyAverageActive(date1); 

      expect(activity1.weeklyAverageSteps).to.equal(7780);
      expect(activity1.weeklyAverageActive).to.equal(155);
    });
    it('should calculate weekly average step count, and minutes active for most recent date if date doesn\'t exist', function() {
      
      activity2.updateRecord(activityData, activity2.activityRecord);
      activity2.calcWeeklyAverageActive(date2); 

      expect(activity2.weeklyAverageSteps).to.equal(8068);
      expect(activity2.weeklyAverageActive).to.equal(170);
    });
  });
  describe('calcAvgWeeklyFlights', function () {
    it('should calculate weekly average flights of stairs climbed', function() {
      activity1.updateRecord(activityData, activity1.activityRecord);
      const averageFlights = activity1.calcAvgWeeklyFlights(date1); 

      expect(averageFlights).to.equal(30);
    });
    it('should calculate weekly average flights of stairs climbed for most recent date, if date doesn\'t exist', function() {
      activity2.updateRecord(activityData, activity2.activityRecord);
      const averageFlights = activity2.calcAvgWeeklyFlights(date2); 

      expect(averageFlights).to.equal(19);
    });
  });
  describe('calculateMiles', function () {
    it('should have a method that calculate miles walked', function() {
      activity1.updateRecord(activityData, activity1.activityRecord); 
      activity1.findTodayActivityData(); 
      const miles = activity1.calculateMiles();
      expect(miles).to.equal(4.2);
    });
  });
  describe('findMostFlightsClimbed', function () {
    it('should have a method that returns the highest climbing record', function() {
      activity1.updateRecord(activityData, activity1.activityRecord);
      const numFlights = activity1.findMostFlightsClimbed(); 

      expect(numFlights).to.equal(46);
    });
  });
  describe('findGoalMatchDays', function () {
    it('should count the number of days step goal was reached', function() {
      activity1.updateRecord(activityData, activity1.activityRecord);
      const positiveDays = activity1.findGoalMatchDays(); 

      expect(positiveDays).to.equal(5);
    });
    it('should return false if goal isn\'t met', function() {
      activity1.updateRecord(activityData, activity1.activityRecord);
      activity1.findTodayActivityData(); 
      activity1.compareStepGoal();

      expect(activity1.reachedStepGoal).to.equal(false);
    });
    it('should return true if goal is met', function() {
      activity2.updateRecord(activityData, activity2.activityRecord);
      activity2.findTodayActivityData(activityData); 
      activity2.compareStepGoal();

      expect(activity2.reachedStepGoal).to.equal(true);
    });
  });
});
