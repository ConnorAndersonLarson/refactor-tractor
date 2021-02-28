class Sleep { 
  constructor(userID, date) {
    this.userID = userID
    this.date = date; 
    this.hoursSlept = 0; 
    this.sleepQuality = 0; 
    this.averageSlept = 0;
    this.averageQuality = 0;
    this.weeklySlept = 0; 
    this.weeklyQuality = 0; 
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
    this.averageSlept = Number((averageSleepData.hours/this.sleepRecord.length).toFixed(1));
    this.averageQuality = Number((averageSleepData.quality/this.sleepRecord.length).toFixed(1));  
  }
   
  calcWeeklyAvgData(date) {
    const sleepDataIndex = this.sleepRecord.findIndex(sleep => {
      return sleep.date === date;
    }); 
    const lastWeekData = this.sleepRecord.slice(sleepDataIndex, sleepDataIndex + 7);
    const averageWeeklyData = lastWeekData.reduce((averages, day) => {
      if(!averages.hours){
        averages.hours = day.hours; 
        averages.quality = day.quality;
    } else {
        averages.hours += day.hours; 
        averages.quality += day.quality;
    }  
       return averages
    }, {})
    this.weeklySlept = Number((averageWeeklyData.hours/7).toFixed(1));
    this.weeklyQuality = Number((averageWeeklyData.quality/7).toFixed(1));
  }
}


export default Sleep;
