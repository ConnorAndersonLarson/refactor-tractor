//import './css/base.scss';
import './css/styles.scss';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

//Global variables here


let todayDate = "2019/09/22";

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
user.findWeeklyFriendActivityData(activityData, todayDate);
user.calcFriendsWeeklyStepAvg()


//sleep
const sleep = new Sleep(user, todayDate);
sleep.updateRecord(sleepData, sleep.sleepRecord);
sleep.findTodaySleepData(sleepData);
sleep.calcAvgSleepData();
sleep.calcWeeklyAvgData(todayDate);

//userRepo
userRepository.calcDailyUserData(todayDate, activityData, sleepData, hydrationData)
const averageSleepQuality = userRepository.dailyUsersQualityAvg();
console.log(averageSleepQuality)

//hydration
const hydration = new Hydration(user, todayDate);
hydration.updateRecord(hydrationData, hydration.hydrationRecord);
hydration.calcOuncesAverage();
hydration.findTodayHydrationData();


//activity
const activity = new Activity(user, todayDate);
activity.updateRecord(activityData, activity.activityRecord);
activity.findTodayActivityData(activityData);
activity.calcWeeklyAverageActive(todayDate);
console.log(userRepository)
console.log(user);
console.log(activity);
console.log(sleep);
console.log(hydration);

const dailyOz = document.querySelectorAll('.daily-oz');
const dropdownEmail = document.querySelector('#dropdown-email');
const dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
const dropdownGoal = document.querySelector('#dropdown-goal');
const dropdownName = document.querySelector('#dropdown-name');
const headerName = document.querySelector('#header-name');
const hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
const hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
const hydrationFriendsCard = document.querySelector('#hydration-friends-card');
const hydrationInfoCard = document.querySelector('#hydration-info-card');
const hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
const hydrationMainCard = document.querySelector('#hydration-main-card');
const hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
const mainPage = document.querySelector('main');
const profileButton = document.querySelector('#profile-button');
const sleepCalendarCard = document.querySelector('#sleep-calendar-card');
const sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
const sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
const sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
const sleepFriendsCard = document.querySelector('#sleep-friends-card');
const sleepAllUsersQualityAverage = document.querySelector('#sleep-friend-quality-average');
const sleepInfoCard = document.querySelector('#sleep-info-card');
const sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
const sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
const sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
const sleepMainCard = document.querySelector('#sleep-main-card');
const sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');

const stairsCalendarCard = document.querySelector('#stairs-calendar-card');
const stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
const stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
const stepsMainCard = document.querySelector('#steps-main-card');
const stepsInfoCard = document.querySelector('#steps-info-card');
const stepsFriendsCard = document.querySelector('#steps-friends-card');
const stepsTrendingCard = document.querySelector('#steps-trending-card');
const stepsCalendarCard = document.querySelector('#steps-calendar-card');
const stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
const stairsFriendsCard = document.querySelector('#stairs-friends-card');
const stairsInfoCard = document.querySelector('#stairs-info-card');
const stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
const stairsMainCard = document.querySelector('#stairs-main-card');
const stairsTrendingCard = document.querySelector('#stairs-trending-card');
const stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
const stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
const stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
const stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
const stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
const stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
const stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
const stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
const stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
const trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
const trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
const userInfoDropdown = document.querySelector('#user-info-dropdown');
const sleepDate = document.querySelector('.date-input');
const hoursSleptInput = document.querySelector('.hours-slept-input');
const sleepQualityInput = document.querySelector('.sleep-quality-input');
const submitButton = document.querySelector('#sleepSubmitButton');
const hydrationDateInput = document.querySelector('.hydration-date-input');
const ouncesDrankInput = document.querySelector('.ounces-drank-input');
const hydrationSubmitButton = document.querySelector("#hydrationSubmitButton");
const activityDateInput = document.querySelector(".activity-date-input");
const numberOfStepsInput = document.querySelector(".number-steps-input");
const minutesActiveInput = document.querySelector(".minutes-active-input");
const flightsOfStairsInput = document.querySelector(".stairs-input");
const activitySubmitButton = document.querySelector("#activitySubmitButton");
const showFormButtons = document.querySelector('#formButtons')
const sleepInputForm = document.querySelector(".sleep-input-form");
const activityInputForm = document.querySelector(".activity-input-form");
const hydrationInputForm = document.querySelector(".hydration-input-form");
const successfulSubmit = document.querySelector(".successful-submit");
const failedSubmit = document.querySelector(".failed-submit");
const clearButton = document.querySelector(".clear-button");
const errorMessage = document.querySelector(".error-message");

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
  if (event.target.classList.contains('form-button')){
    show(clearButton)
  };
  if (event.target.id ===  'showActivityButton') {
    show(activityInputForm);
    hide(hydrationInputForm)
    hide(sleepInputForm);
  } else if (event.target.id === 'showHydrationButton') {
    show(hydrationInputForm);
    hide(activityInputForm);
    hide(sleepInputForm);
  } else if (event.target.id === 'showSleepButton') {
    show(sleepInputForm);
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

updateTrendingStairsDays()
function updateTrendingStairsDays() {
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
