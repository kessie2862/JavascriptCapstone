const displayMealList = (meals) => {
  const mealListContainer = document.getElementById('mealList');
  const mealsMenuItem = document.getElementById('mealsMenuItem');

  mealsMenuItem.firstChild.textContent = `Meals (${meals.length})`;

  const createMealCard = (meal) => {
    const mealCard = document.createElement('div');
    mealCard.className = 'meal-card';
    mealCard.id = meal.idMeal;

    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = `${meal.strMealThumb}/preview`;

    const nameHeading = document.createElement('h3');
    nameHeading.textContent = meal.strMeal;

    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'actions-container';

    const likesContainer = document.createElement('div');
    likesContainer.className = 'likes-container';

    const heartIcon = document.createElement('i');
    heartIcon.className = 'heart-icon uil uil-heart';
    heartIcon.setAttribute('data-meal-id', meal.idMeal);

    const likeCount = document.createElement('span');
    likeCount.className = 'like-count';
    const storedLikes = localStorage.getItem(meal.idMeal);
    likeCount.textContent = `Likes: ${storedLikes || 0}`;

    likesContainer.appendChild(heartIcon);
    likesContainer.appendChild(likeCount);

    const commentButton = document.createElement('button');
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
  meals.forEach((meal) => {
    const mealCard = createMealCard(meal);
    mealListContainer.appendChild(mealCard);
  });
};

export default displayMealList;
