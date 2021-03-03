import { expect } from 'chai';
import Sleep from '../src/Sleep';
import sleepData from '../src/data/sleep-test-data';
import User from '../src/User';

describe('Sleep', function() {
  let user1, user2, date1, date2, sleep1, sleep2; 
   
  beforeEach(() => {
   date1 = '2021/02/27';
   date2 = '2021/03/07';
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
      'id': 2,
      'name': 'Jarvis Considine',
      'address': '30086 Kathryn Port, Ciceroland NE 07273',
      'email': 'Dimitri.Bechtelar11@gmail.com',
      'strideLength': 4.5,
      'dailyStepGoal': 5000,
      'friends': [
        9,
        18,
        24,
        19
      ]
    }, date2);
   
    sleep1 = new Sleep(user1, date1);
    sleep2 = new Sleep(user2, date2); 
  });
      
  it('should be a function', function() {
    expect(Sleep).to.be.a('function');
  });
  it('should be an instance of Sleep', function() {
    expect(sleep1).to.be.an.instanceof(Sleep);
  });
  it('should hold a userId, and date', function() {
   
    expect(sleep1.id).to.equal(1);
    expect(sleep1.date).to.equal("2021/02/27");
  });
  it('should hold a default value for average slept hours and average quality', function () {
    expect(sleep1.averageSlept).to.equal(0);
    expect(sleep1.averageQuality).to.equal(0);
    expect(sleep1.weeklySlept).to.equal(0);
    expect(sleep1.weeklyQuality).to.equal(0);
  })
  it('should hold an empty sleep record by default', function() {
    expect(sleep1.sleepRecord).to.deep.equal([]);
  })

  describe('updateRecord', function () {
    it('should update the sleep record with all user\'s sleep data', function () {
      sleep1.updateRecord(sleepData, sleep1.sleepRecord); 
      expect(sleep1.sleepRecord[0]).to.deep.equal({
        'userID': 1,
        'date': '2021/03/06',
        'hoursSlept': 6.1,
        'sleepQuality': 1.3
      });
    });
  });
  describe('findTodaySleepData', function() {
    it('should find current day\'s hours slept and sleep quality', function() {
      sleep1.updateRecord(sleepData, sleep1.sleepRecord); 
      sleep1.findTodaySleepData()
      expect(sleep1.hoursSlept).to.equal(6.1);
      expect(sleep1.sleepQuality).to.equal(1.3);
    });
    it('should find most recent day\'s hours slept and sleep quality if date doesn\'t exist', function () {
      sleep2.updateRecord(sleepData, sleep2.sleepRecord);  
      sleep2.findTodaySleepData()
     
      expect(sleep2.hoursSlept).to.equal(4.4); 
      expect(sleep2.sleepQuality).to.equal(2.3); 
    });
  });
  describe("calcAvgSleepData", function () {
    it('should update user\'s slept hours average and quality average', function() {
      sleep1.updateRecord(sleepData, sleep1.sleepRecord);
      sleep1.calcAvgSleepData(); 

      expect(sleep1.averageSlept).to.equal(7.8);
      expect(sleep1.averageQuality).to.equal(2.8);
    });
  });
  describe('calcWeeklyAvgData', function () {
    it('it should calculate user\'s average weekly sleep hours and quality given a specific date', function() {
      sleep1.updateRecord(sleepData, sleep1.sleepRecord)
      sleep1.calcWeeklyAvgData(date1);

      expect(sleep1.weeklySlept).to.equal(7.7);
      expect(sleep1.weeklyQuality).to.equal(3);
    });
    it('it should calculate user\'s average weekly sleep hours and quality if date doesn\'t exist', function() {
      sleep2.updateRecord(sleepData, sleep2.sleepRecord);
      sleep2.calcWeeklyAvgData(date2);

      expect(sleep2.weeklySlept).to.equal(7.8);
      expect(sleep2.weeklyQuality).to.equal(3);
    });
  });
});
