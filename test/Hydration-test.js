import { expect } from 'chai';

import Hydration from '../src/Hydration';
import UserRepository from '../src/UserRepository';
import User from '../src/User';

describe('Hydration', function() {
  let hydration;
  let user1;
  let user2;
  let userRepository;
  let hydrate1;
  let hydrate2;
  let hydrate3;
  let hydrateTestData;

  beforeEach(() => {
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
    }, '2019/06/16')
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
    }, '2019/06/16')
    userRepository = new UserRepository([user1, user2]);
    hydrateTestData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "numOunces": 75
    },
    {
      "userID": 2,
      "date": "2019/06/16",
      "numOunces": 91
    }]
    // hydrate1 = new Hydration({
        // "userID": 1,
        // "date": "2019/06/15",
        // "numOunces": 37
    //   }, userRepository);
    // hydrate2 = new Hydration({
      // "userID": 2,
      // "date": "2019/06/15",
      // "numOunces": 75
    // }, userRepository)
    // hydrate3 = new Hydration({
      // "userID": 2,
      // "date": "2019/06/16",
      // "numOunces": 91
    // }, userRepository)
  })

  // it('should be a function', function() {
  //   console.log('user1',user1.hydration)
  //   expect(user1.hydration).to.be.a('function');
  // });
  it('should be an instance of hydrate', function() {
    expect(user1.hydration).to.be.an.instanceof(Hydration);
  });
  it('should have an id', function() {
    expect(user2.hydration.userId).to.equal(2);
  });
  it('should have a date', function() {
    expect(user1.hydration.date).to.equal('2019/06/16');
  });
  it('should have a default ouncesAverage of 0', function() {
    expect(user1.hydration.ouncesAverage).to.equal(0);
  });
  it('should have a default ouncesRecord of []', function() {
    expect(user1.hydration.ouncesRecord).to.deep.equal([]);
  });

  describe('updateHydration', function () {
    it('should have a total amount of ounces drank', function() {
      user2.hydration.updateHydration(hydrateTestData)
      expect(user2.hydration.totalOunces).to.equal(166);
    });
    it('should update the average number of ounces over all time', function() {
      user2.hydration.updateHydration(hydrateTestData)
      expect(user2.hydration.ouncesAverage).to.equal(83);
    })
    it('should add the date and amount to the object record', function() {
      user1.hydration.updateHydration(hydrateTestData)
      expect(user1.hydration.ouncesRecord).to.deep.equal([{"2019/06/15": 37}])
      expect(user1.hydration.ouncesRecord.length).to.equal(1)
    })
  });

  describe('addDailyOunces', function() {
    it('addDailyOunces should show the last week of water', function() {
      user2.hydration.updateHydration(hydrateTestData)
      expect(user2.hydration.addDailyOunces("2019/06/15")).to.equal(75);
    });
  })
});
