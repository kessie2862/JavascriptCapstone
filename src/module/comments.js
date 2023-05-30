import { v4 as uuidv4 } from 'uuid';
import comments from './initComment.js';

const incrementCommentCount = () => {
  const commentHeading = document.querySelector('.popup h2');
  const currentCount = parseInt(commentHeading.textContent.match(/\d+/)[0], 10);

  const newCount = currentCount + 1;
  commentHeading.textContent = `Comments (${newCount})`;
};

const addComment = (mealId) => {
  document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('input').value;
    const msg = document.getElementById('msg').value;
    const id = uuidv4();
    const postId = await comments();

    await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${postId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: id,
          username: name,
          comment: msg,
        }),
      },
    );

    const getComments = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${postId}/comments?item_id=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8;',
        },
      },
    );

    if (getComments.ok) {
      const comments = await getComments.json();
      comments.forEach((comment) => {
        const commentList = document.querySelector('.comments');
        const commentItem = document.createElement('li');
        commentItem.innerHTML = `
        <li><p>${comment.creation_date} ${comment.username}: ${comment.comment}</p></li>
        `;
        commentList.appendChild(commentItem);
      });
      incrementCommentCount();
      const currentDate = new Date().toISOString().split('T')[0];
      const storedComments = localStorage.getItem(`comments_${mealId}`);
      const updatedComments = storedComments ? JSON.parse(storedComments) : [];
      updatedComments.push({
        id,
        username: name,
        comment: msg,
        creation_date: currentDate,
      });
      localStorage.setItem(
        `comments_${mealId}`,
        JSON.stringify(updatedComments),
      );
    }
    document.getElementById('form').reset();
  });
};

export default addComment;
