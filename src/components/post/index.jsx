function Post({ id, title, body }) {
  return (
    <li>
      <p>{id}</p>
      <h2>{title}</h2>
      <p>{body}</p>
    </li>
  );
}
export default Post;
