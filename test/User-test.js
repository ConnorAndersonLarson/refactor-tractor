import { expect } from 'chai';
import User from '../src/User';
import activityData from '../src/data/activity-test-data';


describe.only('User', function() {
  let user, date1, date2;
  beforeEach(() => {
     date1 = '2019/03/06';
     date2 = '2019/03/07';
    user = new User({
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
  })
  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of user', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have an id, name, address, email and date', function() {
    expect(user.id).to.equal(1);
    expect(user.name).to.equal('Luisa Hane');
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
    expect(user.date).to.equal('2019/03/06')
  });
  it('should have a stride length, daily step goal, and friends list', function() {
    expect(user.strideLength).to.equal(4.3);
    expect(user.dailyStepGoal).to.equal(10000);
    expect(user.friends).to.deep.equal([3])
  });
  it('should have a default value for friends steps and friends activity records', function () {
    expect(user.friendsSteps).to.deep.equal([]);
    expect(user.friendsWeeklyActivityRecords).to.deep.equal([]);
  })
  describe('getFirstName', function () {
    it('getFirstName should return the first name of the user', function () {
      expect(user.getFirstName()).to.equal('LUISA');
    });
  })
 describe('findWeeklyFriendActivityData', function () {
   it('should find friend\'s weekly activity information for a given date', function () {

    user.findWeeklyFriendActivityData(activityData, date1);
    
    expect(user.friendsWeeklyActivityRecords.length).to.equal(1);
    expect(user.friendsWeeklyActivityRecords[0].length).to.equal(7);
    expect(user.friendsWeeklyActivityRecords[0][0]).to.deep.equal({
      "userID": 3,
      "date": "2019/03/06",
      "numSteps": 3987,
      "minutesActive": 45,
      "flightsOfStairs": 0
    }); 
   });
   it('should find friend\'s most recent weekly activity information if date doesn\'t exist', function () {

    user.findWeeklyFriendActivityData(activityData, date2);

    expect(user.friendsWeeklyActivityRecords.length).to.equal(1);
    expect(user.friendsWeeklyActivityRecords[0].length).to.equal(7);
    expect(user.friendsWeeklyActivityRecords[0][0]).to.deep.equal({
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
      user.findWeeklyFriendActivityData(activityData, date1);
      user.calcFriendsWeeklyStepAvg();
      expect(user.friendsSteps.length).to.equal(1);
      expect(user.friendsSteps).to.deep.equal([{id: 3, totalWeeklySteps: 7488}])
    });
  });
  describe('updateRecord', function () {
    it('should update health records', function () {
      const activityRecord = []
      user.updateRecord(activityData, activityRecord); 
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
      
    })
  })
  
});
