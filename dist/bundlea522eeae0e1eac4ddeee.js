"use strict";
(self["webpackChunkjavascriptcapstone"] = self["webpackChunkjavascriptcapstone"] || []).push([["bundle"],{

/***/ "./module/likes.js":
/*!*************************!*\
  !*** ./module/likes.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleLikeClick: () => (/* binding */ handleLikeClick),
/* harmony export */   updateLikeCount: () => (/* binding */ updateLikeCount)
/* harmony export */ });
// Function to update the like count for a specific meal
var updateLikeCount = function updateLikeCount(mealId) {
  // Selecting the like count element associated with the given mealId
  var likeCountEl = document.querySelector(".heart-icon[data-meal-id=\"".concat(mealId, "\"] + .like-count"));

  // Parsing the current number of likes from the like count element
  var currentLikes = parseInt(likeCountEl.textContent.split(':')[1].trim(), 10);

  // Incrementing the like count by 1 after every click.
  var updatedLikes = currentLikes + 1;

  // Updating the like count element with the new value
  likeCountEl.textContent = "Likes: ".concat(updatedLikes);

  // Storing the updated like count in the local storage using the mealId as the key
  localStorage.setItem(mealId, updatedLikes);
};

// Function to handle the click event on the heart icon
var handleLikeClick = function handleLikeClick(event, appID) {
  // Extracting the mealId from the data-meal-id attribute of the clicked element
  var mealId = event.target.getAttribute('data-meal-id');

  // Creating the request body to be sent with the POST request
  var requestBody = {
    item_id: mealId
  };

  // Sending a POST request to update the like count for the meal with the specified appID
  fetch("https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/".concat(appID, "/likes/"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  }).then(function (response) {
    // Checking if the POST request was successful (status code 201)
    if (response.status === 201) {
      // Calling the updateLikeCount function to increment the like count in the UI
      updateLikeCount(mealId);
    }
  });
};

/***/ }),

/***/ "./module/mealList.js":
/*!****************************!*\
  !*** ./module/mealList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var displayMealList = function displayMealList(meals) {
  var mealListContainer = document.getElementById('mealList');
  var mealsMenuItem = document.getElementById('mealsMenuItem');

  // Update menu item with meal count
  mealsMenuItem.firstChild.textContent = "Meals (".concat(meals.length, ")");

  // Create meal cards
  var createMealCard = function createMealCard(meal) {
    var mealCard = document.createElement('div');
    mealCard.className = 'meal-card';
    var thumbnailImg = document.createElement('img');
    thumbnailImg.src = "".concat(meal.strMealThumb, "/preview");
    var nameHeading = document.createElement('h3');
    nameHeading.textContent = meal.strMeal;
    var actionsContainer = document.createElement('div');
    actionsContainer.className = 'actions-container';
    var likesContainer = document.createElement('div');
    likesContainer.className = 'likes-container';
    var heartIcon = document.createElement('i');
    heartIcon.className = 'heart-icon uil uil-heart';
    heartIcon.setAttribute('data-meal-id', meal.idMeal);
    var likeCount = document.createElement('span');
    likeCount.className = 'like-count';
    var storedLikes = localStorage.getItem(meal.idMeal);
    likeCount.textContent = "Likes: ".concat(storedLikes || 0);
    likesContainer.appendChild(heartIcon);
    likesContainer.appendChild(likeCount);
    var commentButton = document.createElement('button');
    commentButton.className = 'comment-button';
    commentButton.textContent = 'Comment';
    actionsContainer.appendChild(likesContainer);
    actionsContainer.appendChild(commentButton);
    mealCard.appendChild(thumbnailImg);
    mealCard.appendChild(nameHeading);
    mealCard.appendChild(actionsContainer);
    return mealCard;
  };

  // Creating meal cards
  meals.forEach(function (meal) {
    var mealCard = createMealCard(meal);
    mealListContainer.appendChild(mealCard);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayMealList);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bundle_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bundle.css */ "./src/bundle.css");
/* harmony import */ var _module_mealList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../module/mealList.js */ "./module/mealList.js");
/* harmony import */ var _module_likes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../module/likes.js */ "./module/likes.js");
// Importing the CSS styles from the bundle.css file


// Importing functions from the mealList and likes modules



// Storing the appID
var appID;

// Sending a POST request to retrieve the appID
fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
  method: 'POST'
}).then(function (response) {
  return response.text();
}) // Parsing the response as text
.then(function (data) {
  appID = data.trim(); // Storing the retrieved appID after removing whitespace

  // Fetching data from the MealDB API for meals starting with the letter 'c'
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c').then(function (response) {
    return response.json();
  }) // Parsing the response as JSON
  .then(function (data) {
    var meals = data.meals; // Extracting the meals from the response data
    (0,_module_mealList_js__WEBPACK_IMPORTED_MODULE_1__["default"])(meals);

    // Attaching event listeners to the heart icons
    var heartIcons = document.querySelectorAll('.heart-icon');
    heartIcons.forEach(function (icon) {
      icon.addEventListener('click', function (event) {
        (0,_module_likes_js__WEBPACK_IMPORTED_MODULE_2__.handleLikeClick)(event, appID);
      });
    });
  });
});

/***/ }),

/***/ "./src/bundle.css":
/*!************************!*\
  !*** ./src/bundle.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=bundlea522eeae0e1eac4ddeee.js.map