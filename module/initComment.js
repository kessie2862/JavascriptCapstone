const comments = async () => {
  const response = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',
    {
      method: 'POST',
    },
  );

  const data = await response.text();
  const postId = data.trim();
  return postId;
};

export default comments;
