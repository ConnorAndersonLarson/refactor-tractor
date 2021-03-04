import User from './User';

class Hydration extends User {
  constructor(userData, date) {
    super(userData, date) 
    this.totalOunces = 0;
    this.ouncesAverage = 0;
    this.hydrationRecord = [];
  }

  findTodayHydrationData() {
    const todayData = this.findTodayData(this.hydrationRecord);
    this.totalOunces = todayData.numOunces;
  }

  calcOuncesAverage() {
    const sumOunces = this.hydrationRecord.reduce((sum, dataset) => {
      return sum += dataset.numOunces
    }, 0);
    this.ouncesAverage = this.calcAverage(sumOunces, this.hydrationRecord.length, 0); 
  }

  findWeeklyDailyOunces(date) {
    const weeklyHydrationData = this.findWeeklyData(date, this.hydrationRecord); 
    const daysOunces = weeklyHydrationData.map(day => {
      return day.numOunces; 
    });
    return daysOunces; 
  }
}

export default Hydration;
