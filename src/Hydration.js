
class Hydration {
  constructor(userID, date) {
    this.userID = userID;
    this.date = date;
    //this.ounces = data.numOunces;
    this.ouncesAverage = 0;
    this.ouncesRecord = [];
    //this.updateHydration();
  }
  // updateHydration(date, amount) {
  //   this.ouncesRecord.unshift({[date]: amount});
  //   if (this.ouncesRecord.length) {
  //     this.ouncesAverage = Math.round((amount + (this.ouncesAverage * (this.ouncesRecord.length - 1))) / this.ouncesRecord.length);
  //   } else {
  //     this.ouncesAverage = amount;
  //   }
  // }

  updateHydration(data) {
    this.ouncesRecord = data.reduce((record, dataset) => {
      if (this.userID === dataset.userID) {
        record.unshift({[dataset.date]: dataset.numOunces})
      }
      this.ouncesAverage+=dataset.numOunces
      return record;
    }, [])
    this.ouncesAverage = this.ouncesAverage / this.ouncesRecord.length
  }

  // addDailyOunces(date) {
  //   return this.ouncesRecord.reduce((sum, record) => {
  //     let amount = record[date];
  //     if (amount) {
  //       sum += amount
  //     }
  //     return sum
  //   }, 0)
  // }

  addDailyOunces(date) {
    let daysOunces = this.ouncesRecord.find(day => Object.keys(day)[0] === date)
    if(daysOunces) {
      return daysOunces[date]
    }
  }

  // drink(userRepo) {
  //   var hydrate = this;
  //   userRepo.users.find(function(user) {
  //     return user.id === hydrate.userId;
  //   }).updateHydration(this.date, this.ounces);
  // }
}

export default Hydration;
