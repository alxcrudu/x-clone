import useSWRInfinite from "swr/infinite";

import fetcher from "@/libs/fetcher";

import { PAGE_SIZE } from "@/costants";

const useInfiniteTweets = (userId?: string | undefined) => {
  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return userId
      ? `/api/tweets/user/${userId}?page=${pageIndex}&limit=${PAGE_SIZE}`
      : `/api/tweets?page=${pageIndex}&limit=${PAGE_SIZE}`;
  };

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite(getKey, fetcher, {
      revalidateFirstPage: false,
    });

  const mergedData = data ? [].concat(...data) : [];

  return {
    data: mergedData,
    error,
    isLoading,
    isValidating,
    size,
    setSize,
    mutate,
  };
};

export default useInfiniteTweets;
