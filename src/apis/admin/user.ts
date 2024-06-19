import { baseApi } from "../axios";

interface UpdateUserInput {
  section?: string;
  batch?: string;
}

export const getUsersAdmin = ({
  skip,
  limit,
  q,
  status,
  searchInput,
  userNames,
}: {
  skip?: number;
  limit?: number;
  q?: string;
  status?: string;
  searchInput?: string;
  userNames?: string;
}) => {
  return baseApi.get(`/admin/user/list`, {
    params: {
      skip,
      limit,
      q,
      status,
      searchInput,
      userNames,
    },
  });
};

export const updateUserDetails = (id: string, data: UpdateUserInput) => {
  return baseApi.put(`/user/${id}`, {
    ...data,
  });
};
