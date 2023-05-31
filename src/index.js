import './bundle.css';
import addPopup from '../module/addPopup.js';

import displayMealList from '../module/mealList.js';
import { handleLikeClick } from '../module/likes.js';

let appID;

fetch(
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',
  {
    method: 'POST',
  },
)
  .then((response) => response.text())
  .then((data) => {
    appID = data.trim();

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c')
      .then((response) => response.json())
      .then((data) => {
        const { meals } = data;
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
      });
  });

addPopup();
