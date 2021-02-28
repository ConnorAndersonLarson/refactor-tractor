import { expect } from 'chai';
import Sleep from '../src/Sleep';
import sleepData from '../src/data/sleep-test-data';


describe.only('Sleep', function() {
  let user1, date, sleep1; 
   
  beforeEach(() => {
   date = "2021/02/27";
   user1 = {
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
    }
    
    sleep1 = new Sleep(user1.id, date);
  });
      
  it('should be a function', function() {
    expect(Sleep).to.be.a('function');
  });
  it('should be an instance of Sleep', function() {
    expect(sleep1).to.be.an.instanceof(Sleep);
  });
  it('should hold a userId, and date', function() {
    expect(sleep1.userID).to.equal(1);
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

  //Alter methods here
  describe('Sleep Methods', function() {
    it('should find current day\'s hours slept', function() {
      sleep1.findTodaySleepData(sleepData)
      expect(sleep1.hoursSlept).to.equal(6.1);
    });
    it('should find current day\'s sleep quality', function() {
      sleep1.findTodaySleepData(sleepData); 
      expect(sleep1.sleepQuality).to.equal(1.3);
    });
    it('should update user\'s sleep record', function() {
      sleep1.updateSleepRecord(sleepData);
      expect(sleep1.sleepRecord.length).to.equal(14);
      expect(sleep1.sleepRecord[0]).to.deep.equal({
        'date': '2021/03/06',
        'hours': 6.1,
        'quality': 1.3
      })
    });
    it('should update user\'s slept hours average', function() {
      sleep1.updateSleepRecord(sleepData);
      sleep1.calcAvgSleepData();  
      expect(sleep1.averageSlept).to.equal(7.8);
    });
    it('should update user\'s sleep quality average', function() {
      sleep1.updateSleepRecord(sleepData); 
      sleep1.calcAvgSleepData(); 
      expect(sleep1.averageQuality).to.equal(2.8);
    });
    it('it should calculate user\'s average weekly sleep hours given a specific date', function() {
      const date = "2021/02/27"
      sleep1.updateSleepRecord(sleepData)
      sleep1.calcWeeklyAvgData(date);
      expect(sleep1.weeklySlept).to.equal(7.7);
    });
    it('it should calculate user\'s average weekly sleep quality given a specific date', function() {
      const date = "2021/02/27"
      sleep1.updateSleepRecord(sleepData)
      sleep1.calcWeeklyAvgData(date);
      expect(sleep1.weeklyQuality).to.equal(3);
    });
  })
});
