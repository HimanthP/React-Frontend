import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockApi, type Post, type User } from "./mockServer";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      async queryFn() {
        try {
          const data = await mockApi.getUsers();
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

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
              ...result.map(({ id }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post" as const, id: "LIST" },
            ]
          : [{ type: "Post" as const, id: "LIST" }],
    }),

    addPost: builder.mutation<Post, Omit<Post, "id">>({
      async queryFn(post) {
        try {
          const data = await mockApi.createPost(post);
          return { data };
        } catch (error) {
          return { error };
        }
      },

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getPosts",
            undefined,
            (draft) => {
              draft.push({
                id: Date.now(),
                ...arg,
              });
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetPostsQuery,
  useAddPostMutation,
} = apiSlice;