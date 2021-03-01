//import './css/base.scss';
import './css/styles.scss';

// import userData from './data/users';
// import activityData from './data/activity';
// import sleepData from './data/sleep';
// import hydrationData from './data/hydration';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

//Global variables here


let todayDate = "2019/09/22";

// let allUsers = userData.map(newUser => {
//   let user = new User(newUser, todayDate);
//   return user;
// });
let dailyOz;

const apiData = [fetch("http://localhost:3001/api/v1/users"), fetch("http://localhost:3001/api/v1/hydration"),fetch("http://localhost:3001/api/v1/sleep"),fetch("http://localhost:3001/api/v1/activity")]


Promise.all(apiData)
.then(responses => Promise.all(responses.map(response => response.json())))
.then(data => {
  console.log(data);

  //have an array of resolved promises, an array of all the data we need
   const [userData, hydrationData, sleepData, activityData] = data
   initialize(userData.userData, hydrationData.hydrationData, sleepData.sleepData, activityData.activityData)


});

//put query selectors in this function that will grab DOM nodes while we wait for data to load
//call this function right away so it fires while we wait for the other stuf to load in our fetch
getDomNodes();
function getDomNodes() {
//list all the querySelectors here that we can load while we wait
 dailyOz = document.querySelectorAll('.daily-oz');
}

//use helper functions start breaking up the code currently in intialize
function populateDomNodes() {
  //functionto display DOM elements
}

function initialize (userData, hydrationData, sleepData, activityData) {
let todayDate = "2019/09/22";

//call helper functions
populateDomNodes();


const userList = userData.map(user => {
  return user = new User(user, todayDate);
});
const userRepository = new UserRepository(userList);
let user = userRepository.users[0];


//sleep
user.sleep.findTodaySleepData(sleepData);
user.sleep.updateSleepRecord(sleepData);
user.sleep.calcAvgSleepData();
user.sleep.calcWeeklyAvgData(todayDate);

//userRepo
userRepository.calcDailyUserData(todayDate, activityData, sleepData, hydrationData)
user.sleep.calcWeeklyAvgData(todayDate);

//hydration
user.hydration.updateHydration(hydrationData)

//activity
const activity = new Activity(user, todayDate);
const userActivityData = activityData.filter(activity => {
  return user.id === activity.userID;
})
activity.findTodayActivityData(userActivityData);
activity.updateActivities(userActivityData);
activity.calcWeeklyAverageActive(todayDate);
console.log(activity)


user.findFriendsNames(userRepository.users);
// let dailyOz = document.querySelectorAll('.daily-oz');
let dropdownEmail = document.querySelector('#dropdown-email');
let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
let dropdownGoal = document.querySelector('#dropdown-goal');
let dropdownName = document.querySelector('#dropdown-name');
let headerName = document.querySelector('#header-name');
let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
let hydrationInfoCard = document.querySelector('#hydration-info-card');
let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
let hydrationMainCard = document.querySelector('#hydration-main-card');
let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
let mainPage = document.querySelector('main');
let profileButton = document.querySelector('#profile-button');
let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
let sleepFriendsCard = document.querySelector('#sleep-friends-card');
let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
let sleepInfoCard = document.querySelector('#sleep-info-card');
let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
let sleepMainCard = document.querySelector('#sleep-main-card');
let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
let sortedHydrationDataByDate = user.hydration.ouncesRecord.sort((a, b) => {
  if (Object.keys(a)[0] > Object.keys(b)[0]) {
    return -1;
  }
  if (Object.keys(a)[0] < Object.keys(b)[0]) {
    return 1;
  }
  return 0;
});
let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
let stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
let stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
let stepsMainCard = document.querySelector('#steps-main-card');
let stepsInfoCard = document.querySelector('#steps-info-card');
let stepsFriendsCard = document.querySelector('#steps-friends-card');
let stepsTrendingCard = document.querySelector('#steps-trending-card');
let stepsCalendarCard = document.querySelector('#steps-calendar-card');
let stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
let stairsFriendsCard = document.querySelector('#stairs-friends-card');
let stairsInfoCard = document.querySelector('#stairs-info-card');
let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
let stairsMainCard = document.querySelector('#stairs-main-card');
let stairsTrendingButton = document.querySelector('.stairs-trending-button');
let stairsTrendingCard = document.querySelector('#stairs-trending-card');
let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
let stepsTrendingButton = document.querySelector('.steps-trending-button');
let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
let userInfoDropdown = document.querySelector('.user-info-dropdown');
let sleepDate = document.querySelector('.date-input');
let hoursSleptInput = document.querySelector('.hours-slept-input');
let sleepQualityInput = document.querySelector('.sleep-quality-input');
let submitButton = document.querySelector('.submit-button');
let hydrationDateInput = document.querySelector('.hydration-date-input');
let ouncesDrankInput = document.querySelector('.ounces-drank-input');
let hydrationSubmitButton = document.querySelector(".hydration-submit-button");
let activityDateInput = document.querySelector(".activity-date-input");
let numberOfStepsInput = document.querySelector(".number-steps-input");
let minutesActiveInput = document.querySelector(".minutes-active-input");
let flightsOfStairsInput = document.querySelector(".stairs-input");
let activitySubmitButton = document.querySelector(".activity-submit-button");
let showSleepFormButton = document.querySelector(".show-sleep-form");
let showActivityFormButton = document.querySelector(".show-activity-form");
let showHydrationFormButton = document.querySelector(".show-hydration-form");
let sleepInputForm = document.querySelector(".sleep-input-form");
let activityInputForm = document.querySelector(".activity-input-form");
let hydrationInputForm = document.querySelector(".hydration-input-form");
let successfulSubmit = document.querySelector(".successful-submit");
let failedSubmit = document.querySelector(".failed-submit");
let clearButton = document.querySelector(".clear-button");
let errorMessage = document.querySelector(".error-message");

mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);
stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
stepsTrendingButton.addEventListener('click', updateTrendingStepDays());

submitButton.addEventListener('click', postSleepHelper );
hydrationSubmitButton.addEventListener('click', postHydrationHelper);
activitySubmitButton.addEventListener('click', postActivityHelper);
showSleepFormButton.addEventListener('click', showSleepForm);
showActivityFormButton.addEventListener('click', showActivityForm);
showHydrationFormButton.addEventListener('click', showHydrationForm);
clearButton.addEventListener('click', hideForms)

function showErrorMessage() {
  errorMessage.classList.remove("hide")
}

function hideForms() {
  sleepInputForm.classList.add("hide");
  activityInputForm.classList.add("hide");
  hydrationInputForm.classList.add("hide");
  successfulSubmit.classList.add("hide");
  failedSubmit.classList.add("hide");
  clearButton.classList.add("hide");
  errorMessage.classList.add("hide")
}

function showSleepForm() {
  sleepInputForm.classList.remove("hide");
  activityInputForm.classList.add("hide");
  hydrationInputForm.classList.add("hide");
  successfulSubmit.classList.add("hide");
  failedSubmit.classList.add("hide");
  clearButton.classList.remove("hide");
  errorMessage.classList.add("hide")
}

function showActivityForm() {
  activityInputForm.classList.remove("hide");
  sleepInputForm.classList.add("hide");
  hydrationInputForm.classList.add("hide");
  successfulSubmit.classList.add("hide");
  failedSubmit.classList.add("hide");
  clearButton.classList.remove("hide");
  errorMessage.classList.add("hide")
}

function showHydrationForm() {
  hydrationInputForm.classList.remove("hide");
  activityInputForm.classList.add("hide");
  sleepInputForm.classList.add("hide");
  successfulSubmit.classList.add("hide");
  failedSubmit.classList.add("hide");
  clearButton.classList.remove("hide");
  errorMessage.classList.add("hide")
}

//DUPLICATES?
stairsTrendingButton.addEventListener('click', function() {
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${activity.trendingStairsDays[0]}</p>`;
});

stepsTrendingButton.addEventListener('click', function() {
  activity.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${activity.trendingStepDays[0]}</p>`;
});


function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}

function showInfo() {
  if (event.target.classList.contains('steps-info-button')) {
    flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains('steps-friends-button')) {
    flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains('steps-trending-button')) {
    flipCard(stepsMainCard, stepsTrendingCard);
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.classList.contains('stairs-info-button')) {
    flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains('stairs-trending-button')) {
    flipCard(stairsMainCard, stairsTrendingCard);
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard);
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.classList.contains('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}

function updateTrendingStairsDays() {
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>Your flight climbing record to beat:${activity.findMostFlightsClimbed()} flights</p>`;
}

function updateTrendingStepDays() {
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>You've met your step goal ${activity.findGoalMatchDays()} times</p>`;
}


for (var i = 0; i < dailyOz.length; i++) {
  dailyOz[i].innerText = user.hydration.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
}

dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;

dropdownEmail.innerText = `EMAIL | ${user.email}`;

dropdownName.innerText = user.name.toUpperCase();

headerName.innerText = `${user.getFirstName()}'S `;


// hydrationUserOuncesToday.innerText = user.hydration.ouncesRecord.find(hydration => {
//   return hydration.userID === user.id && hydration.date === todayDate;
// }).numOunces;
userOuncesToday(todayDate)

function userOuncesToday(date) {
  let todayOunces = user.hydration.ouncesRecord.find(day => date === Object.keys(day)[0])
  hydrationUserOuncesToday.innerText = todayOunces[date];
  return;
}


hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);

hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
  return hydration.userID === user.id && hydration.date === todayDate;
}).numOunces / 8;

// sleep info here
sleepCalendarHoursAverageWeekly.innerText = user.sleep.weeklySlept;

sleepCalendarQualityAverageWeekly.innerText = user.sleep.weeklyQuality;

displaySleepComparison();
function displaySleepComparison() {
  const longestSleepers = userRepository.dailyLongestSleepers(todayDate, sleepData);
  longestSleepers.forEach(sleeper => {
    const bestSleeper = userRepository.getUser(sleeper.userID)
    sleepFriendLongestSleeper.innerText += `${bestSleeper.getFirstName()} `;
  });
}

//Refactor above
// sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.allTimeLongestSleepers(todayDate, sleepData)
// }).getFirstName();

// sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getWorstSleepers(todayDate, sleepData)
// }).getFirstName();

sleepInfoHoursAverageAlltime.innerText = user.sleep.averageSlept;

stepsInfoMilesWalkedToday.innerText = activity.calculateMiles();

sleepInfoQualityAverageAlltime.innerText = `${user.sleep.averageQuality}/5`;

sleepInfoQualityToday.innerText = `${user.sleep.sleepQuality}/5`

sleepUserHoursToday.innerText = user.sleep.hoursSlept

//stair info here
stairsCalendarFlightsAverageWeekly.innerText = activity.calcAvgWeeklyFlights(todayDate);

stairsCalendarStairsAverageWeekly.innerText = (activity.calcAvgWeeklyFlights(todayDate) * 12).toFixed(0);

stairsFriendFlightsAverageToday.innerText = userRepository.calculateAverageStairs(todayDate);

stairsInfoFlightsToday.innerText = activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).flightsOfStairs;

stairsUserStairsToday.innerText = activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).flightsOfStairs * 12;

//I think duplicated
// stairsCalendarFlightsAverageWeekly.innerText = activity.calculateAverageFlightsThisWeek(todayDate);
// stairsCalendarStairsAverageWeekly.innerText = (activity.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);

//step info here
stepsCalendarTotalActiveMinutesWeekly.innerText = activity.weeklyAverageActive;

stepsCalendarTotalStepsWeekly.innerText = activity.weeklyAverageSteps;

stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);

stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;

stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);

stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).minutesActive;

stepsUserStepsToday.innerText = activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).numSteps;

//user friend's list and steps info
// user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);

user.friendsActivityRecords.forEach(friend => {
  dropdownFriendsStepsContainer.innerHTML += `
  <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
  `;
});

let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');

friendsStepsParagraphs.forEach(paragraph => {
  if (friendsStepsParagraphs[0] === paragraph) {
    paragraph.classList.add('green-text');
  }
  if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
    paragraph.classList.add('red-text');
  }
  if (paragraph.innerText.includes('YOU')) {
    paragraph.classList.add('yellow-text');
  }
});
function postSleepHelper() {
  event.preventDefault();
  const hoursSleptVal = isNaN(parseFloat(hoursSleptInput.value))? 0 : parseFloat(hoursSleptInput.value);
  if(sleepDate.value && hoursSleptVal && parseInt(sleepQualityInput.value)){
      postSleep(sleepDate.value, hoursSleptVal, parseInt(sleepQualityInput.value))
      successfulSubmit.classList.remove("hide")
      failedSubmit.classList.add("hide")
    } else {
      failedSubmit.classList.remove("hide")
    }

  }

  function postHydrationHelper() {
    event.preventDefault();
    const ouncesDrankInputVal= isNaN(parseFloat(ouncesDrankInput.value))? 0 : parseFloat(ouncesDrankInput.value);
    if(hydrationDateInput.value && ouncesDrankInputVal) {
      postHydrate(hydrationDateInput.value, ouncesDrankInputVal)
      successfulSubmit.classList.remove("hide")
      failedSubmit.classList.add("hide")
    } else {
        failedSubmit.classList.remove("hide")
    }
  }

  function postActivityHelper() {
    event.preventDefault();
    const numberOfStepsVal= isNaN(parseFloat(numberOfStepsInput.value))? 0 : parseFloat(numberOfStepsInput.value);
    const minutesActiveVal= isNaN(parseFloat(minutesActiveInput.value))? 0 : parseFloat(minutesActiveInput.value);
    const flightsOfStairsVal= isNaN(parseFloat(flightsOfStairsInput.value))? 0 : parseFloat(flightsOfStairsInput.value);
    if(activityDateInput && numberOfStepsVal && minutesActiveVal && flightsOfStairsVal) {
      postActivity(activityDateInput.value, numberOfStepsVal, minutesActiveVal, flightsOfStairsVal)
      successfulSubmit.classList.remove("hide")
      failedSubmit.classList.add("hide")
    } else {
        failedSubmit.classList.remove("hide")
    }
  }
  //Post functions
  //Sleep
  function postSleep(sleepDate, hours, quality) {
      fetch(`http://localhost:3001/api/v1/sleep`, {
    method: 'POST',
    headers: {
    	'Content-Type': 'application/json'
    },
    body: JSON.stringify({"userID": user.id, "date": sleepDate, "hoursSlept": hours, "sleepQuality": quality})
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => showErrorMessage());
  }
  //Hyrdate
  function postHydrate(hydrationDate, ouncesDrank) {
      fetch(`http://localhost:3001/api/v1/hydration`, {
    method: 'POST',
    headers: {
    	'Content-Type': 'application/json'
    },
    body: JSON.stringify({"userID": user.id, "date": hydrationDate, "numOunces": ouncesDrank})
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => showErrorMessage());
  }
  //Activity
  function postActivity(activityDate, numberOfStepsInput, minutesActiveInput, flightsOfStairsInput) {
      fetch(`http://localhost:3001/api/v1/activity`, {
    method: 'POST',
    headers: {
    	'Content-Type': 'application/json'
    },
    body: JSON.stringify({"userID": user.id, "date": activityDate, "numSteps": numberOfStepsInput, "minutesActive": minutesActiveInput, "flightsOfStairs": flightsOfStairsInput})
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => showErrorMessage());
  }
}


//Post functions
//Sleep
function postSleep(sleepDate, hours, quality) {
    fetch(`http://localhost:3001/api/v1/sleep`, {
  method: 'POST',
  headers: {
  	'Content-Type': 'application/json'
  },
  body: JSON.stringify({"userID": user.id, "date": sleepDate, "hoursSlept": hours, "sleepQuality": quality})
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => showErrorMessage());
}
//Hyrdate
function postHydrate(hydrationDate, ouncesDrank) {
    fetch(`http://localhost:3001/api/v1/hydration`, {
  method: 'POST',
  headers: {
  	'Content-Type': 'application/json'
  },
  body: JSON.stringify({"userID": user.id, "date": hydrationDate, "numOunces": ouncesDrank})
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => showErrorMessage());
}
//Activity
function postActivity(activityDate, numberOfStepsInput, minutesActiveInput, flightsOfStairsInput) {
    fetch(`http://localhost:3001/api/v1/activity`, {
  method: 'POST',
  headers: {
  	'Content-Type': 'application/json'
  },
  body: JSON.stringify({"userID": user.id, "date": activityDate, "numSteps": numberOfStepsInput, "minutesActive": minutesActiveInput, "flightsOfStairs": flightsOfStairsInput})
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => showErrorMessage());
}
