class Sleep { 
  constructor(userID, date) {
    this.userID = userID
    this.date = date; 
    this.hoursSlept = 0; 
    this.sleepQuality = 0; 
    this.hoursSleptAverage = 0;
    this.sleepQualityAverage = 0;
    this.sleepHoursRecord = [];
    this.sleepQualityRecord = [];
  }

  findTodaySleepData(sleepData) {
    const currentDayData = sleepData.find(dataItem => {
      return this.userID === dataItem.userID && this.date === dataItem.date
    })
    this.hoursSlept = currentDayData.hoursSlept; 
    this.sleepQuality = currentDayData.sleepQuality; 
  }

 
  updateSleepRecords(sleepData) {
    const userSleepData = sleepData.filter(sleepItem => {
      return sleepItem.userID === this.userID; 
    })
     userSleepData.forEach(sleepItem => {
      this.sleepHoursRecord.unshift({
        'date': sleepItem.date,
        'hours': sleepItem.hoursSlept
      });
      this.sleepQualityRecord.unshift({
        'date': sleepItem.date,
        'quality': sleepItem.sleepQuality
      });
    })
  }
  calcAverageHoursSlept() {  
    this.hoursSleptAverage = this.reduce((averageHours, day) => {
        return ((averageHours += day.hours)/this.sleepHoursRecord.length).toFixed(1);
    }, 0)
  }

  calcAverageSleepQuality() {  
    this.sleepQualityAverage = this.sleepQualityRecord.reduce((averageQuality, day) => {
      return ((averageQuality += day.quality)/this.sleepQualityRecord.length).toFixed(1);
  }, 0)
}
   
  calculateAverageHoursThisWeek(todayDate) {

    //slice or splice out of sleepHoursRecord array from 0-6, reduce that down baybay

    const lastWeekSleepHours = this.sleepHoursRecord.slice(0, 8)
    console.log(lastWeekSleepHours)
    return (this.sleepHoursRecord.reduce((sum, sleepAct) => {
      let index = this.sleepHoursRecord.indexOf(this.sleepHoursRecord.find(sleep => sleep.date === todayDate));
      if (index <= this.sleepHoursRecord.indexOf(sleepAct) && this.sleepHoursRecord.indexOf(sleepAct) <= (index + 6)) {
        sum += sleepAct.hours;
      }
      return sum;
    }, 0) / 7).toFixed(1);
  }

  calculateAverageQualityThisWeek(todayDate) {
    return (this.sleepQualityRecord.reduce((sum, sleepAct) => {
      let index = this.sleepQualityRecord.indexOf(this.sleepQualityRecord.find(sleep => sleep.date === todayDate));
      if (index <= this.sleepQualityRecord.indexOf(sleepAct) && this.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
        sum += sleepAct.quality;
      }
      return sum;
    }, 0) / 7).toFixed(1);
  }
}

export default Sleep;
