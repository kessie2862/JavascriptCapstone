// Importing the CSS styles from the bundle.css file
import './bundle.css';

// Importing functions from the mealList and likes modules
import displayMealList from '../module/mealList.js';
import { handleLikeClick } from '../module/likes.js';

// Storing the appID
let appID;

// Sending a POST request to retrieve the appID
fetch(
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',
  {
    method: 'POST',
  },
)
  .then((response) => response.text()) // Parsing the response as text
  .then((data) => {
    appID = data.trim(); // Storing the retrieved appID after removing whitespace

    // Fetching data from the MealDB API for meals starting with the letter 'c'
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c')
      .then((response) => response.json()) // Parsing the response as JSON
      .then((data) => {
        const { meals } = data; // Extracting the meals from the response data
        displayMealList(meals);

        // Attaching event listeners to the heart icons
        const heartIcons = document.querySelectorAll('.heart-icon');
        heartIcons.forEach((icon) => {
          icon.addEventListener('click', (event) => {
            handleLikeClick(event, appID);
          });
        });
      });
  });
