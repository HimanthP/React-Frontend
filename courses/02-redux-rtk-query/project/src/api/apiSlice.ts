import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockApi, type Post } from "./mockServer";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      async queryFn() {
        try {
          const data = await mockApi.getPosts();
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post" as const, id: "LIST" },
            ]
          : [{ type: "Post" as const, id: "LIST" }],
    }),

    addPost: builder.mutation<Post, Omit<Post, "id">>({
      async queryFn(post) {
        try {
          const data = await mockApi.createPost({
            ...post,
            userId: 1,
          });
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
} = apiSlice;