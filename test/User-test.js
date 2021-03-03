import { expect } from 'chai';
import User from '../src/User';
import activityData from '../src/data/activity-test-data';


describe('User', function() {
  let user1, user2, date1, date2;
  beforeEach(() => {
     date1 = '2019/03/06';
     date2 = '2019/03/07';
    user1 = new User({
      'id': 1,
      'name': 'Luisa Hane',
      'address': '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      'email': 'Diana.Hayes1@hotmail.com',
      'strideLength': 4.3,
      'dailyStepGoal': 10000,
      'friends': [
        3
      ]
    }, date1)
    user2 = new User({
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        3
      ]
    }, date2)
  })
  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of user', function() {
    expect(user1).to.be.an.instanceof(User);
  });

  it('should have an id, name, address, email and date', function() {
    expect(user1.id).to.equal(1);
    expect(user1.name).to.equal('Luisa Hane');
    expect(user1.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
    expect(user1.email).to.equal('Diana.Hayes1@hotmail.com');
    expect(user1.date).to.equal('2019/03/06')
  });
  it('should have a stride length, daily step goal, and friends list', function() {
    expect(user1.strideLength).to.equal(4.3);
    expect(user1.dailyStepGoal).to.equal(10000);
    expect(user1.friends).to.deep.equal([3])
  });
  it('should have a default value for friends steps and friends activity records', function () {
    expect(user1.friendsSteps).to.deep.equal([]);
    expect(user1.friendsWeeklyActivityRecords).to.deep.equal([]);
  })
  describe('getFirstName', function () {
    it('getFirstName should return the first name of the user', function () {
      expect(user1.getFirstName()).to.equal('LUISA');
    });
  })
 describe('findWeeklyFriendActivityData', function () {
   it('should find friend\'s weekly activity information for a given date', function () {

    user1.findWeeklyFriendActivityData(activityData, date1);
    
    expect(user1.friendsWeeklyActivityRecords.length).to.equal(1);
    expect(user1.friendsWeeklyActivityRecords[0].length).to.equal(7);
    expect(user1.friendsWeeklyActivityRecords[0][0]).to.deep.equal({
      "userID": 3,
      "date": "2019/03/06",
      "numSteps": 3987,
      "minutesActive": 45,
      "flightsOfStairs": 0
    }); 
   });
   it('should find friend\'s most recent weekly activity information if date doesn\'t exist', function () {

    user1.findWeeklyFriendActivityData(activityData, date2);

    expect(user1.friendsWeeklyActivityRecords.length).to.equal(1);
    expect(user1.friendsWeeklyActivityRecords[0].length).to.equal(7);
    expect(user1.friendsWeeklyActivityRecords[0][0]).to.deep.equal({
      "userID": 3,
      "date": "2019/03/06",
      "numSteps": 3987,
      "minutesActive": 45,
      "flightsOfStairs": 0
    }); 
   });
  });
  describe('calcFriendsWeeklyStepAvg', function () {
    it('should calculate friend\'s weekly average step count', function () {
      user1.findWeeklyFriendActivityData(activityData, date1);
      user1.calcFriendsWeeklyStepAvg();
      expect(user1.friendsSteps.length).to.equal(1);
      expect(user1.friendsSteps).to.deep.equal([{id: 3, totalWeeklySteps: 7488}])
    });
  });
  describe('updateRecord', function () {
    it('should update health records', function () {
      const activityRecord = []
      user1.updateRecord(activityData, activityRecord); 
      expect(activityRecord.length).to.equal(14); 
      expect(activityRecord[0]).to.deep.equal({
        "userID": 1,
        "date": "2019/03/06",
        "numSteps": 13532,
        "minutesActive": 34,
        "flightsOfStairs": 30
      });
    });
  });
  describe('findTodayData', function() {
    it('should find daily health data', function () {
      const activityRecord = [];
      user1.updateRecord(activityData, activityRecord);
      const todayData = user1.findTodayData(activityRecord); 
      expect(todayData).to.deep.equal({
        "userID": 1,
        "date": "2019/03/06",
        "numSteps": 13532,
        "minutesActive": 34,
        "flightsOfStairs": 30
      });
    });
    it('should find most recent health data, if date does\'t exist', function () {
      const activityRecord = [];
      user2.updateRecord(activityData, activityRecord);
      const todayData = user2.findTodayData(activityRecord); 
      
      expect(todayData).to.deep.equal({
        "userID": 2,
        "date": "2019/03/06",
        "numSteps": 6945,
        "minutesActive": 145,
        "flightsOfStairs": 0
      });
    });
  });
  describe('findWeeklyData', function () {
    it('should find weekly data for a health record', function () {
      const activityRecord = [];
      user1.updateRecord(activityData, activityRecord); 
      const currentWeekData = user1.findWeeklyData(date1, activityRecord);
      
      expect(currentWeekData.length).to.equal(7);
      expect(currentWeekData[0]).to.deep.equal({
        "userID": 1,
        "date": "2019/03/06",
        "numSteps": 13532,
        "minutesActive": 34,
        "flightsOfStairs": 30
      });
    });
    it('should find most recent weekly data for a health record if date doesn\'t exist', function () {
      const activityRecord = [];
      user1.updateRecord(activityData, activityRecord); 
      const currentWeekData = user1.findWeeklyData(date2, activityRecord);
      
      expect(currentWeekData.length).to.equal(7);
      expect(currentWeekData[0]).to.deep.equal({
        "userID": 1,
        "date": "2019/03/06",
        "numSteps": 13532,
        "minutesActive": 34,
        "flightsOfStairs": 30
      });
    });
  });
  describe('calcAverage', function () {
    it('should calculate averages for health data', function () {
      const weeklySteps = 87540
      const stepAverage = user1.calcAverage(weeklySteps, 7, 0);

      expect(stepAverage).to.equal(12506);
    });
  });
});
