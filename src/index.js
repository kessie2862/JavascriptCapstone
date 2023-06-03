import './bundle.css';
import addPopup from '../module/addPopup.js';
import displayMealList from '../module/mealList.js';
import { handleLikeClick } from '../module/likes.js';

let appID;

async function initApp() {
  if (localStorage.getItem('appID')) {
    appID = localStorage.getItem('appID');
  } else {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',
      {
        method: 'POST',
      },
    );
    const data = await response.text();
    appID = data.trim();
    localStorage.setItem('appID', appID);
  }

  const mealResponse = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?f=c',
  );
  const mealData = await mealResponse.json();
  const { meals } = mealData;

  displayMealList(meals);

  const commentBtns = document.querySelectorAll('.comment-button');
  commentBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => addPopup(e, meals));
  });

  const heartIcons = document.querySelectorAll('.heart-icon');
  heartIcons.forEach((icon) => {
    icon.addEventListener('click', (event) => {
      handleLikeClick(event, appID);
    });
  });
}

initApp();
