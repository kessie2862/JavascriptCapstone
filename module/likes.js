// Function to update the like count for a specific meal
export const updateLikeCount = (mealId) => {
  // Selecting the like count element associated with the given mealId
  const likeCountEl = document.querySelector(
    `.heart-icon[data-meal-id="${mealId}"] + .like-count`,
  );

  // Parsing the current number of likes from the like count element
  const currentLikes = parseInt(
    likeCountEl.textContent.split(':')[1].trim(),
    10,
  );

  // Incrementing the like count by 1 after every click.
  const updatedLikes = currentLikes + 1;

  // Updating the like count element with the new value
  likeCountEl.textContent = `Likes: ${updatedLikes}`;

  // Storing the updated like count in the local storage using the mealId as the key
  localStorage.setItem(mealId, updatedLikes);
};

// Function to handle the click event on the heart icon
export const handleLikeClick = (event, appID) => {
  // Extracting the mealId from the data-meal-id attribute of the clicked element
  const mealId = event.target.getAttribute('data-meal-id');

  // Creating the request body to be sent with the POST request
  const requestBody = {
    item_id: mealId,
  };

  // Sending a POST request to update the like count for the meal with the specified appID
  fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    },
  ).then((response) => {
    // Checking if the POST request was successful (status code 201)
    if (response.status === 201) {
      // Calling the updateLikeCount function to increment the like count in the UI
      updateLikeCount(mealId);
    }
  });
};
