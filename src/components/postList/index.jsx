import axios from "axios";
import { useState, useEffect } from "react";
import Post from "../post";
const BASE_URL = "https://dummyjson.com/";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  async function fetchPosts() {
    try {
      const response = await axios.get(
        `${BASE_URL}posts?limit=10&skip=${(page - 1) * 10}`,
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [page]);
  if (posts.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
export default PostList;
