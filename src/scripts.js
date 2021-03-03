//import './css/base.scss';
import './css/styles.scss';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

//Global variables here


let todayDate = "2019/09/22";
let user;
let userRepository; 
let activity; 
let sleep; 
let hydration; 
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
 
function initializeUsers(userData, activityData, sleepData, hydrationData) {
  const userList = userData.map(user => {
    return user = new User(user, todayDate);
  });
  userRepository = new UserRepository(userList);
  userRepository.calcDailyUserData(todayDate, activityData, sleepData, hydrationData)
  user = userRepository.users[0];
  user.findWeeklyFriendActivityData(activityData, todayDate);
  user.calcFriendsWeeklyStepAvg()
}

function initializeSleep(sleepData) {
  sleep = new Sleep(user, todayDate);
  sleep.updateRecord(sleepData, sleep.sleepRecord);
  sleep.findTodaySleepData(sleepData);
  sleep.calcAvgSleepData();
  sleep.calcWeeklyAvgData(todayDate);
  }

function initializeHydration(hydrationData) {
  const hydration = new Hydration(user, todayDate);
  hydration.updateRecord(hydrationData, hydration.hydrationRecord);
  hydration.calcOuncesAverage();
  hydration.findTodayHydrationData();
}

function initializeActivity(activityData) {
  const activity = new Activity(user, todayDate);
  activity.updateRecord(activityData, activity.activityRecord);
  activity.findTodayActivityData(activityData);
  activity.calcWeeklyAverageActive(todayDate);
}

// function updateTrendingStairsDays(activity) {
//   trendingStairsPhraseContainer.innerHTML = `<h5 class='trend-line'>YOUR FLIGHT CLIMBING RECORD TO BEAT:${activity.findMostFlightsClimbed()} FLIGHTS</h5>`;
// }
  

function initialize (userData, hydrationData, sleepData, activityData) {

//call helper functions
populateDomNodes();
initializeUsers(userData, activityData, sleepData, hydrationData); 
initializeSleep(sleepData, user); 
initializeHydration(hydrationData);
initializeActivity(activityData);  

//sleep
// function initializeSleep() {
// sleep = new Sleep(user, todayDate);
// sleep.updateRecord(sleepData, sleep.sleepRecord);
// sleep.findTodaySleepData(sleepData);
// sleep.calcAvgSleepData();
// sleep.calcWeeklyAvgData(todayDate);
// }


//userRepo
// userRepository.calcDailyUserData(todayDate, activityData, sleepData, hydrationData)
// const averageSleepQuality = userRepository.dailyUsersQualityAvg(); 

// function initializeHydration(hydrationData) {
//   const hydration = new Hydration(user, todayDate);
//   hydration.updateRecord(hydrationData, hydration.hydrationRecord);
//   hydration.calcOuncesAverage();
//   hydration.findTodayHydrationData();
// }



//activity
// function initializeActivity(activityData) {
//   const activity = new Activity(user, todayDate);
//   activity.updateRecord(activityData, activity.activityRecord);
//   activity.findTodayActivityData(activityData);
//   activity.calcWeeklyAverageActive(todayDate);
// }



let dailyOz = document.querySelectorAll('.daily-oz');
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
const sleepAllUsersQualityAverage = document.querySelector('#sleep-friend-quality-average');
let sleepInfoCard = document.querySelector('#sleep-info-card');
let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
let sleepMainCard = document.querySelector('#sleep-main-card');
let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');

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
let stairsTrendingCard = document.querySelector('#stairs-trending-card');
let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
let userInfoDropdown = document.querySelector('#user-info-dropdown');
let sleepDate = document.querySelector('.date-input');
let hoursSleptInput = document.querySelector('.hours-slept-input');
let sleepQualityInput = document.querySelector('.sleep-quality-input');
let submitButton = document.querySelector('#sleepSubmitButton');
let hydrationDateInput = document.querySelector('.hydration-date-input');
let ouncesDrankInput = document.querySelector('.ounces-drank-input');
let hydrationSubmitButton = document.querySelector("#hydrationSubmitButton");
let activityDateInput = document.querySelector(".activity-date-input");
let numberOfStepsInput = document.querySelector(".number-steps-input");
let minutesActiveInput = document.querySelector(".minutes-active-input");
let flightsOfStairsInput = document.querySelector(".stairs-input");
let activitySubmitButton = document.querySelector("#activitySubmitButton");
const showFormButtons = document.querySelector('#formButtons')
let sleepInputForm = document.querySelector(".sleep-input-form");
let activityInputForm = document.querySelector(".activity-input-form");
let hydrationInputForm = document.querySelector(".hydration-input-form");
let successfulSubmit = document.querySelector(".successful-submit");
let failedSubmit = document.querySelector(".failed-submit");
let clearButton = document.querySelector(".clear-button");
let errorMessage = document.querySelector(".error-message");

mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);
submitButton.addEventListener('click', postSleepHelper );
hydrationSubmitButton.addEventListener('click', postHydrationHelper);
activitySubmitButton.addEventListener('click', postActivityHelper);
showFormButtons.addEventListener('click', showForm);
clearButton.addEventListener('click', hideForms)

function show(element) {
 element.classList.remove('hide'); 
}

function hide(element) {
  element.classList.add('hide'); 
}

function showErrorMessage() {
  errorMessage.classList.remove("hide");
  successfulSubmit.classList.add("hide");
}

function hideForms() {
  hide(activityInputForm); 
  hide(hydrationInputForm);
  hide(sleepInputForm);
  hide(clearButton);  
}

function showForm(event) {
  if(event.target.id ===  'showActivityButton') {
    show(activityInputForm);
    show(clearButton)
    hide(hydrationInputForm)
    hide(sleepInputForm); 
  }
  if(event.target.id === 'showHydrationButton') {
    show(hydrationInputForm); 
    show(clearButton); 
    hide(activityInputForm); 
    hide(sleepInputForm);
  }
  if(event.target.id === 'showSleepButton') {
    show(sleepInputForm); 
    show(clearButton); 
    hide(activityInputForm);
    hide(hydrationInputForm); 
  }
}

function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}

function showInfo() {
  if (event.target.id ==='steps-info-button') {
    flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.id ==='steps-friends-button') {
    flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.id === 'stepsTrendingButton') {
    flipCard(stepsMainCard, stepsTrendingCard);
  }
  if (event.target.id ==='steps-calendar-button') {
    flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.id ==='hydration-info-button') {
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.id ==='hydration-friends-button') {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.id ==='hydration-calendar-button') {
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.id ==='stairs-info-button') {
    flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.id ==='stairs-friends-button') {
    flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.id === 'stairsTrendingButton') {
    flipCard(stairsMainCard, stairsTrendingCard);
  }
  if (event.target.id ==='stairs-calendar-button') {
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.id ==='sleep-info-button') {
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.id ==='sleep-friends-button') {
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.id ==='sleep-calendar-button') {
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.id ==='steps-return') {
    flipCard(event.target.parentNode, stepsMainCard);
  }
  if (event.target.id ==='hydrate-return') {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.id ==='stairs-return') {
    flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.id ==='sleep-return') {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}

updateTrendingStairsDays(activity)
function updateTrendingStairsDays(activity) {
  trendingStairsPhraseContainer.innerHTML = `<h5 class='trend-line'>YOUR FLIGHT CLIMBING RECORD TO BEAT:${activity.findMostFlightsClimbed()} FLIGHTS</h5>`;
}

updateTrendingStepDays(); 
function updateTrendingStepDays() {
  trendingStepsPhraseContainer.innerHTML = `<h5 class='trend-line'>YOU'VE MET YOUR STEPS GOAL ${activity.findGoalMatchDays()} TIMES</h5>`;
}

dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;

dropdownEmail.innerText = `EMAIL | ${user.email}`;

dropdownName.innerText = user.name.toUpperCase();

headerName.innerText = `${user.getFirstName()}'S `;

for (var i = 0; i < dailyOz.length; i++) {
  dailyOz[i].innerText = hydration.findWeeklyDailyOunces(todayDate)[i + 1]
}

hydrationUserOuncesToday.innerText = hydration.totalOunces;

hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);

hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
  return hydration.userID === user.id && hydration.date === todayDate;
}).numOunces / 8;

// sleep info here
sleepCalendarHoursAverageWeekly.innerText = sleep.weeklySlept;

sleepCalendarQualityAverageWeekly.innerText = sleep.weeklyQuality;

displaySleepComparison();
function displaySleepComparison() {
  const longestSleepers = userRepository.dailyLongestSleepers(todayDate, sleepData);
  longestSleepers.forEach(sleeper => {
    const bestSleeper = userRepository.getUser(sleeper.userID)
    sleepFriendLongestSleeper.innerHTML += `${bestSleeper.getFirstName()} `;
  });
  sleepAllUsersQualityAverage.innerText = `${userRepository.dailyUsersQualityAvg()}/5`; 
}

//Refactor above
// sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.allTimeLongestSleepers(todayDate, sleepData)
// }).getFirstName();

// sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getWorstSleepers(todayDate, sleepData)
// }).getFirstName();

sleepInfoHoursAverageAlltime.innerText = sleep.averageSlept;

stepsInfoMilesWalkedToday.innerText = activity.calculateMiles();

sleepInfoQualityAverageAlltime.innerText = `${sleep.averageQuality}/5`;

sleepInfoQualityToday.innerText = `${sleep.sleepQuality}/5`

sleepUserHoursToday.innerText = sleep.hoursSlept

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

// user friend's list and steps info
populateFriendSteps(userRepository.users); 
function populateFriendSteps (users) {
  user.friendsSteps.forEach(friend => {
    const friendInfo = users.find(userData => userData.id === friend.id)
    dropdownFriendsStepsContainer.innerHTML += `
  <p class='dropdown-p friends-steps green-text'>${friendInfo.name} |  ${friend.totalWeeklySteps}</p>
  `;
  })
  dropdownFriendsStepsContainer.innerHTML += `<p class='dropdown-p friends-steps yellow-text'>YOU |  ${activity.weeklyAverageSteps}</p>
  `
}

function postSleepHelper() {
  event.preventDefault();
  const correctDate = sleepDate.value.replaceAll("-", "/")
  const hoursSleptVal = isNaN(parseFloat(hoursSleptInput.value))? 0 : parseFloat(hoursSleptInput.value);
  if(sleepDate.value && hoursSleptVal && parseInt(sleepQualityInput.value)){
      postSleep(correctDate, hoursSleptVal, parseInt(sleepQualityInput.value))
      successfulSubmit.classList.remove("hide")
      failedSubmit.classList.add("hide")
    } else {
      failedSubmit.classList.remove("hide")
    }

  }

  function postHydrationHelper() {
    event.preventDefault();
    const correctDate = hydrationDateInput.value.replaceAll("-", "/")
    const ouncesDrankInputVal= isNaN(parseFloat(ouncesDrankInput.value))? 0 : parseFloat(ouncesDrankInput.value);
    if(hydrationDateInput.value && ouncesDrankInputVal) {
      postHydrate(correctDate, ouncesDrankInputVal)
      successfulSubmit.classList.remove("hide")
      failedSubmit.classList.add("hide")
    } else {
        failedSubmit.classList.remove("hide")
    }
  }

  function postActivityHelper() {
    event.preventDefault();
    const correctDate = activityDateInput.value.replaceAll("-", "/")
    const numberOfStepsVal= isNaN(parseFloat(numberOfStepsInput.value))? 0 : parseFloat(numberOfStepsInput.value);
    const minutesActiveVal= isNaN(parseFloat(minutesActiveInput.value))? 0 : parseFloat(minutesActiveInput.value);
    const flightsOfStairsVal= isNaN(parseFloat(flightsOfStairsInput.value))? 0 : parseFloat(flightsOfStairsInput.value);
    if(activityDateInput && numberOfStepsVal && minutesActiveVal && flightsOfStairsVal) {
      postActivity(correctDate, numberOfStepsVal, minutesActiveVal, flightsOfStairsVal)
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
    .then(checkForError)
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
    .then(checkForError)
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
    .then(checkForError)
    .catch(err => showErrorMessage());
  }
}

const checkForError = response => {
  if (!response.ok) {
    showErrorMessage();
  } else {
    return response.json();
  }
}

//Post functions
//Sleep
// function postSleep(sleepDate, hours, quality) {
//     fetch(`http://localhost:3001/api/v1/sleep`, {
//   method: 'POST',
//   headers: {
//   	'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({"userID": user.id, "date": sleepDate, "hoursSlept": hours, "sleepQuality": quality})
// })
//   .then(response => response.json())
//   .then(json => console.log(json))
//   .catch(err => showErrorMessage());
// }
// //Hyrdate
// function postHydrate(hydrationDate, ouncesDrank) {
//     fetch(`http://localhost:3001/api/v1/hydration`, {
//   method: 'POST',
//   headers: {
//   	'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({"userID": user.id, "date": hydrationDate, "numOunces": ouncesDrank})
// })
//   .then(response => response.json())
//   .then(json => console.log(json))
//   .catch(err => showErrorMessage());
// }
// //Activity
// function postActivity(activityDate, numberOfStepsInput, minutesActiveInput, flightsOfStairsInput) {
//     fetch(`http://localhost:3001/api/v1/activity`, {
//   method: 'POST',
//   headers: {
//   	'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({"userID": user.id, "date": activityDate, "numSteps": numberOfStepsInput, "minutesActive": minutesActiveInput, "flightsOfStairs": flightsOfStairsInput})
// })
//   .then(response => response.json())
//   .then(json => console.log(json))
//   .catch(err => showErrorMessage());
// }
