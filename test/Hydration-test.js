import { expect } from 'chai';

import Hydration from '../src/Hydration';
import User from '../src/User';
import hydrationData from '../src/data/hydration-test-data';

describe('Hydration', function() {
  let hydration1, hydration2, user1, user2, date1, date2;

  beforeEach(() => {
    date1 = "2021/03/06"
    date2 = "2021/03/07"
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
    }, date1)
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
    }, date2);
    hydration1 = new Hydration(user1, date1); 
    hydration2 = new Hydration(user2, date2);
  });
  it('should be a function', function() {
    expect(Hydration).to.be.a('function');
  });
  it('should be an instance of hydrate', function() {
    expect(hydration1).to.be.an.instanceof(Hydration);
  });
  it('should have an id and date', function() {
    expect(hydration1.id).to.equal(1); 
    expect(hydration1.date).to.equal("2021/03/06")
  })
  it('should have a default ouncesAverage of 0', function() {
    expect(hydration1.ouncesAverage).to.equal(0);
  });
  it('should have a default hydrationRecord of []', function() {
    expect(hydration1.hydrationRecord).to.deep.equal([]);
  });
  describe('updateRecords', function () {
    it('should be able to update the hydration record', function() {
      hydration1.updateRecord(hydrationData, hydration1.hydrationRecord)
      expect(hydration1.hydrationRecord.length).to.equal(14); 
      expect(hydration1.hydrationRecord[0]).to.deep.equal( {
        "userID": 1,
        "date": "2021/03/06",
        "numOunces": 87
       });
    });
  });
  describe('findTodayHydrationData', function () {
    it('should find total ounces for current day', function() {
      hydration1.updateRecord(hydrationData, hydration1.hydrationRecord); 
      hydration1.findTodayHydrationData(); 
      
      expect(hydration1.totalOunces).to.equal(87);
    });
    it('should be able to find most recent ounces if date doesn\'t exist', function () {
      hydration2.updateRecord(hydrationData, hydration2.hydrationRecord); 
      hydration2.findTodayHydrationData(); 

      expect(hydration2.totalOunces).to.equal(98)
    })
  }); 
  describe('calcOuncesAverage', function() {
    it('should calculate a user\'s ounces for all time', function() {
      hydration1.updateRecord(hydrationData, hydration1.hydrationRecord);
      hydration1.calcOuncesAverage(); 
      expect(hydration1.ouncesAverage).to.equal(52);
    });
  })
  describe('findWeeklyDailyOunces', function() {
    it('should return the past 6 days of recorded daily ounces', function () {
      hydration1.updateRecord(hydrationData, hydration1.hydrationRecord); 
      const weeklyData = hydration1.findWeeklyDailyOunces(date1);
      expect(weeklyData).to.deep.equal([87, 40, 32, 23, 62, 60, 85])
    });
    it('should return the most recently recorded 6 days of date doesn\'t exist', function () {
        hydration2.updateRecord(hydrationData, hydration2.hydrationRecord); 
        const weeklyData = hydration2.findWeeklyDailyOunces(date2); 
        expect(weeklyData).to.deep.equal([98, 56, 52, 54, 23, 30, 40 ]);
    });
  });
});
