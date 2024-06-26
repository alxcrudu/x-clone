import React, { useCallback, useMemo } from "react";

import useTweet from "./useTweet";
import useInfiniteTweets from "./useInfiniteTweets";

import axios from "axios";
import toast from "react-hot-toast";

const useLike = ({ tweetId, userId }: { tweetId: string; userId: string }) => {
  const { data: fetchedTweet, mutate: mutateFetchedTweet } = useTweet(tweetId);
  const { mutate: mutateUserFetchedTweets } =
    useInfiniteTweets(userId);
  const { mutate: mutateFetchedTweets } = useInfiniteTweets(userId);

  const hasLiked = useMemo(() => {
    const list = fetchedTweet?.likeIds || [];

    return list.includes(userId);
  }, [userId, fetchedTweet]);

  const toggleLike = useCallback(async () => {
    try {
      let request;

      if (hasLiked) {
        request = () =>
          axios.delete("/api/like", {
            data: {
              tweetId,
              userId,
            },
          });
      } else {
        request = () =>
          axios.post("/api/like", {
            tweetId,
            userId,
          });
      }

      await request();

      mutateFetchedTweet();
      mutateUserFetchedTweets();
      mutateFetchedTweets();
    } catch (err) {
      console.log(err);
      toast.error("Error :/");
    }
  }, [
    userId,
    hasLiked,
    tweetId,
    mutateFetchedTweets,
    mutateFetchedTweet,
    mutateUserFetchedTweets,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
