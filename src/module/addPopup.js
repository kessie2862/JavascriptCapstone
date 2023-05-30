import addComment from './comments.js';

const addPopup = async (e, meals) => {
  const parent = e.target.parentNode.parentNode.cloneNode(true);
  const parentId = parent.id;
  let category;
  let title;
  let origin;
  let ingredients;
  const propertiesToCheck = ['strCategory', 'strMeal', 'strArea', 'strTags'];

  meals.forEach((item) => {
    if (item.idMeal === parentId) {
      propertiesToCheck.forEach((property) => {
        if (
          item[property]
          && (item[property] === 'unknown' || item[property] === 'Unknown')
        ) {
          item[property] = '';
        }
      });

      category = item.strCategory || '';
      title = item.strMeal || '';
      origin = item.strArea || '';
      ingredients = item.strTags || '';
    }
  });
  const img = parent.firstChild.src;
  const name = parent.firstChild.nextSibling.textContent;

  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <div class="popup-content">
      <span class="closeBtn">X</span>
        <div class="mealDetail">
            <img src=${img} alt=${name} class="popupImg" />
            <div class="mealDetail__info">
             ${category && `<h3>category: ${category}</h3>`}
            ${title && `<h3>name: ${title}</h3>`}
            ${origin && `<h3>origin: ${origin}</h3>`}
            ${ingredients && `<h3>Ingredients: ${ingredients}</h3>`}
            </div>
        </div>
        <h2> Comments</h2>
        
        <ul class="comments"></ul>
        <form id="form">
        <h3>Add Comment</h3>
        <input type="text" placeholder="Your name " id="input" />
        <textarea cols='50' rows='5' placeholder="Enter your comment" id="msg"></textarea>
        <button type="submit">Comment</button>
        </form>
    </div>

    `;

  const commentList = popup.querySelector('.comments');
  const mealId = parent.id;
  const storedComments = localStorage.getItem(`comments_${mealId}`);
  const savedComments = storedComments ? JSON.parse(storedComments) : [];

  const commentCount = savedComments.length;
  const commentHeading = popup.querySelector('.popup h2');
  commentHeading.textContent = `Comments (${commentCount})`;

  savedComments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.innerHTML = `
      <p>${comment.creation_date} ${comment.username}: ${comment.comment}</p>
    `;
    commentList.appendChild(commentItem);
  });

  const mealList = document.getElementById('mealList');
  mealList.appendChild(popup);
  addComment(mealId);
  const closeBtn = document.querySelector('.closeBtn');
  closeBtn.addEventListener('click', () => {
    popup.remove();
  });
};

export default addPopup;
