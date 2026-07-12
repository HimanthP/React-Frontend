import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../api/apiSlice";

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();

  const id = postId ? Number(postId) : undefined;

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useGetPostByIdQuery(id as number, {
    skip: !id,
  });

  if (isLoading) {
    return (
      <div data-testid="post-detail-loading">
        Loading post...
      </div>
    );
  }

  if (isError) {
    return (
      <div data-testid="post-detail-error">
        {error instanceof Error
          ? error.message
          : "Error loading post."}
      </div>
    );
  }

  if (!post) {
    return (
      <div data-testid="post-detail">
        No post selected.
      </div>
    );
  }

  return (
    <div data-testid="post-detail">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>
        <strong>Post ID:</strong> {post.id}
      </p>
      <p>
        <strong>User ID:</strong> {post.userId}
      </p>
    </div>
  );
}