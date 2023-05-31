const comments = async () => fetch(
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',
  {
    method: 'POST',
  },
)
  .then((response) => response.text())
  .then((data) => {
    const postId = data.trim();
    return postId;
  });

export default comments;
