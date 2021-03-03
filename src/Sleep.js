import User from './User';

class Sleep extends User {
  constructor(userdata, date) {
  super(userdata, date)
    this.hoursSlept = 0;
    this.sleepQuality = 0;
    this.averageSlept = 0;
    this.averageQuality = 0;
    this.weeklySlept = 0;
    this.weeklyQuality = 0;
    this.sleepRecord = [];
  }

  findTodaySleepData() {
    const todaysData = this.findTodayData(this.sleepRecord); 
    this.hoursSlept = todaysData.hoursSlept;
    this.sleepQuality = todaysData.sleepQuality;
  }

  calcAvgSleepData() {
    const averageDailyData = {hours: 0, quality: 0};
    this.sleepRecord.forEach(day => {
      averageDailyData.hours += day.hoursSlept;
      averageDailyData.quality += day.sleepQuality; 
  });
    this.averageSlept = this.calcAverage(averageDailyData.hours, this.sleepRecord.length, 1); 
    this.averageQuality = this.calcAverage(averageDailyData.quality, this.sleepRecord.length, 1); 
  }

  calcWeeklyAvgData(date) {
    const lastWeekData = this.findWeeklyData(date, this.sleepRecord);
    const averageWeeklyData = {hours: 0, quality: 0};
    lastWeekData.forEach(day => {
      averageWeeklyData.hours += day.hoursSlept;
      averageWeeklyData.quality += day.sleepQuality;
  });
    this.weeklySlept = this.calcAverage(averageWeeklyData.hours, 7, 1);
    this.weeklyQuality = this.calcAverage(averageWeeklyData.quality, 7, 1);
  }
}


export default Sleep;
