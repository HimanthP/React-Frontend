import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetPostsQuery } from "../api/apiSlice";
import { setSortBy } from "../store/slices/filtersSlice";

export default function PostsWithFilters() {
  const dispatch = useAppDispatch();

  const { data: posts = [], isLoading } = useGetPostsQuery();

  const sortBy = useAppSelector((state) => state.filters.sortBy);

  const sortedPosts = [...posts].sort((a, b) =>
    sortBy === "newest" ? b.id - a.id : a.id - b.id
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div data-testid="posts-with-filters">
      <div data-testid="filter-controls">
        <button onClick={() => dispatch(setSortBy("newest"))}>
          Newest
        </button>

        <button onClick={() => dispatch(setSortBy("oldest"))}>
          Oldest
        </button>
      </div>

      <ul>
        {sortedPosts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}