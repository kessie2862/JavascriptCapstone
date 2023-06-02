import { incrementCommentCount } from './comments.js';

describe('incrementCommentCount', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="popup">
        <h2>Comments (5)</h2>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should increment the comment count', () => {
    incrementCommentCount();

    const commentHeading = document.querySelector('.popup h2');
    const newCount = parseInt(commentHeading.textContent.match(/\d+/)[0], 10);

    expect(newCount).toBe(6);
  });
});
