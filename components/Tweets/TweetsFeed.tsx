"use client";

import React from "react";

import Loader from "../Loader";
import Tweet from "./Tweet";

import InfiniteScroll from "react-infinite-scroll-component";

import useInfiniteTweets from "@/hooks/useInfiniteTweets";

import { Post } from "@prisma/client";

import { ITweetsFeedProps } from "@/types";

import { PAGE_SIZE } from "@/costants";

const TweetsFeed: React.FC<ITweetsFeedProps> = ({ user, session }) => {
  const {
    data: infiniteData,
    size,
    setSize,
    isLoading,
  } = useInfiniteTweets(user && user.id);

  if (!session || isLoading || !infiniteData)
    return (
      <div className="h-full w-full">
        <Loader />
      </div>
    );

  return (
    <InfiniteScroll
      dataLength={infiniteData.length}
      next={() => setSize(size + 1)}
      hasMore={infiniteData.length % PAGE_SIZE === 0}
      loader={<Loader />}
      endMessage={
        <p className="text-center text-twitterBlue mt-4 mb-4">
          🎉 Yay! You have seen it all!
        </p>
      }
    >
      {infiniteData.map((tweet: Post) => (
        <Tweet key={tweet.id} tweet={tweet} session={session} />
      ))}
    </InfiniteScroll>
  );
};

export default TweetsFeed;
