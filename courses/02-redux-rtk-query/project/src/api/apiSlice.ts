import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockApi, type User } from "./mockServer";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => ({
        data: await mockApi.getUsers(),
      }),
    }),
  }),
});

export const { useGetUsersQuery } = apiSlice;