class Sleep { 
  constructor(userID, date) {
    this.userID = userID
    this.date = date; 
    this.hoursSlept = 0; 
    this.sleepQuality = 0; 
    this.averageSlept = 0;
    this.averageQuality = 0;
    this.sleepRecord = []; 
  }

  findTodaySleepData(sleepData) {
    const currentDayData = sleepData.find(dataItem => {
      return this.userID === dataItem.userID && this.date === dataItem.date
    })
    this.hoursSlept = currentDayData.hoursSlept; 
    this.sleepQuality = currentDayData.sleepQuality; 
  }

 
  updateSleepRecord(sleepData) {
    const userSleepData = sleepData.filter(sleepItem => {
      return sleepItem.userID === this.userID; 
    })
     userSleepData.forEach(sleepItem => {
      this.sleepRecord.unshift({
        'date': sleepItem.date,
        'hours': sleepItem.hoursSlept,
        'quality':sleepItem.sleepQuality
      });
     }) 
  }
 
  calcAvgSleepData() {
    const averageSleepData = this.sleepRecord.reduce((averages, day) => {
      if(!averages.hours){
        averages.hours = day.hours; 
        averages.quality = day.quality;
    } else {
        averages.hours += day.hours; 
        averages.quality += day.quality;
    }
       return averages
    }, {})
    this.averageSlept = (averageSleepData.hours/this.sleepRecord.length).toFixed(1); 
    this.averageQuality = (averageSleepData.quality/this.sleepRecord.length).toFixed(1);  
  }
   
  calcWeeklyAvgHoursSlept(date) {
    const sleptHoursIndex = this.sleepRecord.findIndex(sleep => {
      return sleep.date === date
    })
    const lastWeekSleepHours = this.sleepRecord.slice(sleptHoursIndex, 7)
    const averageSleepHours = lastWeekSleepHours.reduce((sumHours, day) => {
       return sumHours += day.hours/7
    }, 0)
    return averageSleepHours.toFixed(1);    
  }
  
  calcWeeklyAvgQuality(date) {
    const sleepQualityIndex = this.sleepRecord.findIndex(sleep => {
      return sleep.date === date;
    })
    const lastWeekQualityHours = this.sleepRecord.slice(sleepQualityIndex, 7); 
    const averageQualityHours = lastWeekQualityHours.reduce((sumHours, day) => {
      return sumHours += day.hours/7
   }, 0)
   
   return averageQualityHours.toFixed(1);    
  }

  // calculateAverageQualityThisWeek(todayDate) {
  //   return (this.sleepQualityRecord.reduce((sum, sleepAct) => {
  //     let index = this.sleepQualityRecord.indexOf(this.sleepQualityRecord.find(sleep => sleep.date === todayDate));
  //     if (index <= this.sleepQualityRecord.indexOf(sleepAct) && this.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
  //       sum += sleepAct.quality;
  //     }
  //     return sum;
  //   }, 0) / 7).toFixed(1);
  // }
  // calcWeeklyAvg() {
  //   const lastWeekSleepHours = this.sleepHoursRecord.slice(0, 7);
  //   const lastWeekQualityHours = this.sleepQualityRecord.slice(0, 7);

  // }
}


export default Sleep;
