import './css/styles.scss';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

const apiData = [fetch("http://localhost:3001/api/v1/users"), fetch("http://localhost:3001/api/v1/hydration"),fetch("http://localhost:3001/api/v1/sleep"),fetch("http://localhost:3001/api/v1/activity")]

Promise.all(apiData)
.then(responses => Promise.all(responses.map(response => response.json())))
.then(data => {
  const [userData, hydrationData, sleepData, activityData] = data;
  initialize(userData.userData, hydrationData.hydrationData, sleepData.sleepData, activityData.activityData);
});

let todayDate = "2019/09/22";
let user;
let userRepository; 
let activity; 
let sleep; 
let hydration; 
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
let submitButton = document.querySelector('#sleep-submit-button');
let hydrationDateInput = document.querySelector('.hydration-date-input');
let ouncesDrankInput = document.querySelector('.ounces-drank-input');
let hydrationSubmitButton = document.querySelector("#hydration-submit-button");
let activityDateInput = document.querySelector(".activity-date-input");
let numberOfStepsInput = document.querySelector(".number-steps-input");
let minutesActiveInput = document.querySelector(".minutes-active-input");
let flightsOfStairsInput = document.querySelector(".stairs-input");
let activitySubmitButton = document.querySelector("#activity-submit-button");
const showFormButtons = document.querySelector('#form-buttons')
let sleepInputForm = document.querySelector(".sleep-input-form");
let activityInputForm = document.querySelector(".activity-input-form");
let hydrationInputForm = document.querySelector(".hydration-input-form");
let successfulSubmit = document.querySelector(".successful-submit");
let failedSubmit = document.querySelector(".failed-submit");
let clearButton = document.querySelector(".clear-button");
let errorMessage = document.querySelector(".error-message");
let cards = [{ name:"main-steps-card", card: stepsMainCard}, {name:"info-button", card: stepsInfoCard}, {name: "friends-button", card: stepsFriendsCard},{name:"trending-button", card: stepsTrendingCard}, {name: "calendar-button", card: stepsCalendarCard}, {name:"hydration-main-card", card: hydrationMainCard}, {name:"hydration-info-button", card: hydrationInfoCard}, {name:"hydration-friends-button", card: hydrationFriendsCard}, {name:"hydration-calendar-button", card: hydrationCalendarCard}, {name:"stairs-main-card", card: stairsMainCard}, {name:"stairs-info-button", card: stairsInfoCard}, {name:"stairs-friends-button", card: stairsFriendsCard}, {name:"stairs-trending-button", card: stairsTrendingCard}, {name:"stairs-calendar-button", card: stairsCalendarCard}, {name:"sleep-main-card", card: sleepMainCard}, {name:"sleep-info-button", card: sleepInfoCard}, {name:"sleep-friends-button", card: sleepInfoCard}, {name:"sleep-calendar-button", card: sleepCalendarCard}]

mainPage.addEventListener('click', showCardInfo);
profileButton.addEventListener('click', showDropdown);
submitButton.addEventListener('click', postSleepHelper);
hydrationSubmitButton.addEventListener('click', postHydrationHelper);
activitySubmitButton.addEventListener('click', postActivityHelper);
showFormButtons.addEventListener('click', showForm);
clearButton.addEventListener('click', hideForms);

function initialize (userData, hydrationData, sleepData, activityData) {
  initializeUsers(userData, activityData, sleepData, hydrationData); 
  initializeSleep(sleepData, user); 
  initializeHydration(hydrationData);
  initializeActivity(activityData); 
  createDropdown();
  createStepsCard(activityData);
  createStairsCard(activityData); 
  createSleepCard(sleepData);
  createHydrationCard(hydrationData); 
}

function showErrorMessage() {
  errorMessage.classList.remove("hide");
  successfulSubmit.classList.add("hide");
}

function show(element) {
element.classList.remove('hide');
}

function hide(element) {
  element.classList.add('hide');
}

function hideForms() {
  hide(activityInputForm);
  hide(hydrationInputForm);
  hide(sleepInputForm);
  hide(clearButton);
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}

function showForm(event) {
  if(event.target.id ===  'show-activity-button') {
    show(activityInputForm);
    show(clearButton)
    hide(hydrationInputForm)
    hide(sleepInputForm);
  }
  if(event.target.id === 'show-hydration-button') {
    show(hydrationInputForm);
    show(clearButton);
    hide(activityInputForm);
    hide(sleepInputForm);
  }
  if(event.target.id === 'show-sleep-button') {
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

function showCardInfo() {
  let cardA = cards.find(card => card.name === event.target.getAttribute("data-cardAName"));
  let cardB = cards.find(card => card.name === event.target.getAttribute("data-cardBName"));
  if(cardA && cardB) {
    flipCard(cardB.card, cardA.card)
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
  hydration = new Hydration(user, todayDate);
  hydration.updateRecord(hydrationData, hydration.hydrationRecord);
  hydration.calcOuncesAverage();
  hydration.findTodayHydrationData();
}

function initializeActivity(activityData) {
  activity = new Activity(user, todayDate);
  activity.updateRecord(activityData, activity.activityRecord);
  activity.findTodayActivityData(activityData);
  activity.calcWeeklyAverageActive(todayDate);
}

function createDropdown() {
  dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
  dropdownEmail.innerText = `EMAIL | ${user.email}`;
  dropdownName.innerText = user.name.toUpperCase();
  headerName.innerText = `${user.getFirstName()}'S `;
  populateFriendSteps(userRepository.users);
}

function populateFriendSteps (users) {
  user.friendsSteps.forEach(friend => {
    const friendInfo = users.find(userData => userData.id === friend.id)
    dropdownFriendsStepsContainer.innerHTML += `
  <p class=‘dropdown-p friends-steps green-text’>${friendInfo.name} |  ${friend.totalWeeklySteps}</p>
  `;
  })
  dropdownFriendsStepsContainer.innerHTML += `<p class=‘dropdown-p friends-steps yellow-text’>YOU |  ${activity.weeklyAverageSteps}</p>
  `
}

function createStairsCard(activityData) {
  displayStairStreak();
  displayWeeklyStairData(); 
  displayDailyStairInfo(activityData); 
   stairsFriendFlightsAverageToday.innerText = userRepository.calculateAverageStairs(todayDate);
}
function displayDailyStairInfo(activityData) {
  stairsInfoFlightsToday.innerText = activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).flightsOfStairs;

  stairsUserStairsToday.innerText = activityData.find(activity => {
    return activity.userID === user.id && activity.date === todayDate;
  }).flightsOfStairs * 12;
}

function displayWeeklyStairData() {
  stairsCalendarFlightsAverageWeekly.innerText = activity.calcAvgWeeklyFlights(todayDate);
  stairsCalendarStairsAverageWeekly.innerText = (activity.calcAvgWeeklyFlights(todayDate) * 12).toFixed(0);
}

function displayStairStreak() {
  trendingStairsPhraseContainer.innerHTML = `<h5 class='trend-line'>YOUR FLIGHT CLIMBING RECORD TO BEAT:${activity.findMostFlightsClimbed()} FLIGHTS</h5>`;
}

function createStepsCard(activityData) {
  displayWeeklyActivity(); 
  displayAllUserActivity();
  displayDailyActivity(activityData);  
  displayStepStreak();
}

function displayDailyActivity(activityData) {
  stepsInfoMilesWalkedToday.innerText = activity.calculateMiles();
  stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
      return activity.userID === user.id && activity.date === todayDate;
    }).minutesActive;
  
    stepsUserStepsToday.innerText = activityData.find(activity => {
      return activity.userID === user.id && activity.date === todayDate;
    }).numSteps;
}

function displayWeeklyActivity() {
  stepsCalendarTotalActiveMinutesWeekly.innerText = activity.weeklyAverageActive;
  stepsCalendarTotalStepsWeekly.innerText = activity.weeklyAverageSteps;
}

function displayAllUserActivity() {
 stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);
  stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;
  stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);
}

function displayStepStreak() {
  trendingStepsPhraseContainer.innerHTML = `<h5 class='trend-line'>YOU'VE MET YOUR STEPS GOAL ${activity.findGoalMatchDays()} TIMES</h5>`;
}

function createSleepCard(sleepData) {
  displayUserSleep(); 
  displayLongestSleepers(sleepData);
  displayUserWeeklySleep();
  sleepAllUsersQualityAverage.innerText =  userRepository.dailyUsersQualityAvg()
}
function displayUserSleep() {
  sleepUserHoursToday.innerText = sleep.hoursSlept
  sleepInfoHoursAverageAlltime.innerText = sleep.averageSlept;
  sleepInfoQualityAverageAlltime.innerText = `${sleep.averageQuality}/5`;
  sleepInfoQualityToday.innerText = `${sleep.sleepQuality}/5`
}

function displayUserWeeklySleep() {
  sleepCalendarHoursAverageWeekly.innerText = sleep.weeklySlept;
  sleepCalendarQualityAverageWeekly.innerText = sleep.weeklyQuality;
}

function displayLongestSleepers(sleepData) {
  const longestSleepers = userRepository.dailyLongestSleepers(todayDate, sleepData);
  longestSleepers.forEach(sleeper => {
    const bestSleeper = userRepository.getUser(sleeper.userID)
    sleepFriendLongestSleeper.innerText += `${bestSleeper.getFirstName()} `;
  });
}

function createHydrationCard(hydrationData) {
  displayWeeklyHydration(); 
  displayDailyHydration(hydrationData); 
  hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate); 
}

function displayDailyHydration(hydrationData) {
  hydrationUserOuncesToday.innerText = hydration.totalOunces;
  hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
    return hydration.userID === user.id && hydration.date === todayDate;
  }).numOunces / 8;
}

function displayWeeklyHydration() {
  for (var i = 0; i < dailyOz.length; i++) {
    dailyOz[i].innerText = hydration.findWeeklyDailyOunces(todayDate)[i + 1]
  }
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

const checkForError = response => {
  if (!response.ok) {
    showErrorMessage();
  } else {
    return response.json();
  }
}

