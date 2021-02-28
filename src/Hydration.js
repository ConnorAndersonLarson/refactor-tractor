
class Hydration {
  constructor(userID, date) {
    this.userId = userID;
    this.date = date;
    this.totalOunces = 0;
    this.ouncesAverage = 0;
    this.ouncesRecord = [];
  }

  updateHydration(data) {
    this.ouncesRecord = data.reduce((record, dataset) => {
      if (this.userId === dataset.userID) {
        record.unshift({[dataset.date]: dataset.numOunces})
        this.totalOunces+=dataset.numOunces
        this.ouncesAverage+=dataset.numOunces
      }
      return record;
    }, [])
    this.ouncesAverage = this.ouncesAverage / this.ouncesRecord.length
  }

  addDailyOunces(date) {
    let daysOunces = this.ouncesRecord.find(day => Object.keys(day)[0] === date)
    if(daysOunces) {
      return daysOunces[date]
    }
  }
}

export default Hydration;
