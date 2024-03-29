import fetcher from "@/libs/fetcher";

import useSWR from "swr";

const useRecommendedUsers = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/users/recommended-users`,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useRecommendedUsers;
