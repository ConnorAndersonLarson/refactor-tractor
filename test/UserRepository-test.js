import { expect } from 'chai';

import UserRepository from '../src/UserRepository';
import User from '../src/User';
import Sleep from '../src/Sleep';
import sleepData from '../src/data/sleep-test-data';
import activityData from '../src/data/activity-test-data';

describe.only('UserRepository', function() {
  let user1, user2, user3, users, date, userRepository;
  beforeEach(() => {
    date = "2021/02/27";
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
    })
    user2 = new User({
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    })
    user3 = new User({
      "id": 3,
      "name": "Herminia Witting",
      "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
      "email": "Elwin.Tromp@yahoo.com",
      "strideLength": 4.4,
      "dailyStepGoal": 15000,
      "friends": [
        19,
        11,
        42,
        33
      ]
    })
    users = [user1, user2, user3]
    userRepository = new UserRepository(users);
  })
  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });
  it('should be an instance of user repository', function() {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });
  it('should take in an array as an argument' , function() {
    expect(Array.isArray(users)).to.equal(true)
    let testUserRepo = new UserRepository(users);
    expect(testUserRepo.users).to.deep.equal(users);
  })
  it('should hold an array of users', function() {
    expect(userRepository.users).to.deep.equal([user1, user2, user3]);
    expect(userRepository.users.length).to.equal(3);
    expect(userRepository.users[0]).to.be.instanceof(User); 
  });
  it('should have a default daily record of user\'s activities and sleep', function () {
    expect(userRepository.dailyUsersActivities).to.deep.equal([])
    expect(userRepository.dailyUsersSleep).to.deep.equal([]); 
  })
  describe('userRepository Methods', function () {
  it('should return user object when given a user id', function() {
    const foundUser = userRepository.getUser(2); 
    expect(foundUser).to.equal(user2);
  })
  it('should find the daily user data for activity and sleep', function () {
    userRepository.calcDailyUserData(date, activityData, sleepData);
    expect(userRepository.dailyUsersActivities.length).to.equal(2);
    expect(userRepository.dailyUsersSleep.length).to.equal(2); 
    expect(userRepository.dailyUsersSleep).to.deepEqual([{
      "userID": 1,
      "date": "2021/02/27",
      "hoursSlept": 6.1,
      "sleepQuality": 1.3
    },
    {
      "userID": 2,
      "date": "2021/02/27",
      "hoursSlept": 4.4,
      "sleepQuality": 2.3
    }])
  })
  it('should return average step goal for all users', function() {
    const averageStepGoal = userRepository.calculateAverageStepGoal();
    expect(averageStepGoal).to.equal(10000);
  });
  //left off here, need data file example
  it('should calculate daily average steps for all users', function () {
    const averageSteps = userRepository.calculateAverageSteps();
    expect(averageSteps).to.equal()
  })
  it('calculateAverageSleepQuality should return average sleep quality for all users', function() {
    user1.sleepQualityAverage = 3.3;
    user2.sleepQualityAverage = 5;
    user3.sleepQualityAverage = 1;
    expect(userRepository.calculateAverageSleepQuality()).to.equal(3.1);
  });
  it('should have a method that calculates friends average ounces of water', function() {
    user1.ouncesRecord = [
      {"2019/06/15": 1},
      {"2019/06/15": 1},
      {"2019/06/16": 5}
    ]
    user2.ouncesRecord = [
      {"2019/06/15": 1},
      {"2019/06/15": 1},
      {"2019/06/16": 8}
    ]
    user3.ouncesRecord = [
      {"2019/06/15": 1},
      {"2019/06/15": 1},
      {"2019/06/16": 4}
    ]
    expect(userRepository.calculateAverageDailyWater("2019/06/16")).to.equal(5)
  });
  it('should have a method that finds the best sleepers', function() {
    sleep1 = new Sleep({
      "userID": 1,
      "date": "2019/06/16",
      "hoursSlept": 6.1,
      "sleepQuality": 1000
    }, userRepository);
    sleep2 = new Sleep({
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7.3,
      "sleepQuality": 500
    }, userRepository);
    sleep3 = new Sleep({
      "userID": 3,
      "date": "2019/06/15",
      "hoursSlept": 9.3,
      "sleepQuality": 1.4
    }, userRepository);
    expect(userRepository.findBestSleepers("2019/06/16")).to.deep.equal([user1, user2]);
  });
  it('should have a method that finds the longest sleepers', function() {
    sleepData = [{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 100
    }, {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7.3,
      "sleepQuality": 1500
    }, {
      "userID": 3,
      "date": "2019/06/15",
      "hoursSlept": 9.3,
      "sleepQuality": 1.4
    }];
    expect(userRepository.getLongestSleepers("2019/06/15")).to.equal(3);
  });
  it('should have a method that finds the worst sleepers', function() {
    sleepData = [{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 1000
    }, {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7.3,
      "sleepQuality": 500
    }, {
      "userID": 3,
      "date": "2019/06/15",
      "hoursSlept": 9.3,
      "sleepQuality": 1.4
    }];
    expect(userRepository.getWorstSleepers("2019/06/15")).to.equal(1);
  });
  it('should have a method that calculates average number of stairs for users', function() {
    user1.activityRecord = [{date: "2019/09/17", flightsOfStairs: 10}, {date: "2019/09/17", flightsOfStairs: 15}];
    user2.activityRecord = [{date: "2019/09/16", flightsOfStairs: 8}, {date: "2019/09/17", flightsOfStairs: 4}];
    expect(userRepository.calculateAverageStairs("2019/09/17")).to.equal(10);
  })
  it('should have a method that calculates average number of steps for users', function() {
    user1.activityRecord = [{date: "2019/09/17", steps: 100}, {date: "2019/09/17", steps: 2000}];
    user2.activityRecord = [{date: "2019/09/16", steps: 9820}, {date: "2019/09/17", steps: 234}];
    expect(userRepository.calculateAverageSteps("2019/09/17")).to.equal(778);
  })
  it('should have a method that calculates average number of active minutes for users', function() {
    user1.activityRecord = [{date: "2019/09/17", minutesActive: 100}, {date: "2019/09/17", minutesActive: 20}];
    user2.activityRecord = [{date: "2019/09/16", minutesActive: 78}, {date: "2019/09/17", minutesActive: 12}];
    expect(userRepository.calculateAverageMinutesActive("2019/09/17")).to.equal(44);
  })
 })
});
