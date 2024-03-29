"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import React from "react";

import Verified from "../../SVG/Verified";
import Button from "@/components/Button";

import { trends } from "./trends";

import useRecommendedUsers from "@/hooks/useRecommendedUsers";
import useFollow from "@/hooks/useFollow";

import { IFollowRecommendation, ITrend } from "@/types";

const RightSidebar = () => {
  const { data: recommendations } = useRecommendedUsers();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="hidden w-[30%] p-4 text-ligthGray lg:sticky lg:block">
      <div className="mt-4 rounded-xl bg-accent p-4">
        <h2 className="text-xl font-bold text-ligthGray">
          Subscribe to Premium
        </h2>
        <p>
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <button className="mt-4 rounded-full bg-twitterBlue px-6 py-2 text-white">
          Subscribe
        </button>
      </div>
      <div className="mt-4 rounded-xl bg-accent p-4">
        <h2 className="mb-4 text-xl font-bold text-ligthGray">Who to follow</h2>
        {session &&
          recommendations?.map((user: any, i: number) => (
            <FollowRecommendation
              key={i}
              id={user?.id}
              name={user?.name}
              username={user?.username}
              img={user?.profileImage}
              verified={user?.verified}
              session={session}
              router={router}
            />
          ))}
        <p className="mt-4 text-twitterBlue">Show more</p>
      </div>
      <div className="mt-4 rounded-xl bg-accent py-4">
        <h2 className="mb-2 px-4 text-xl font-bold text-ligthGray">
          United States trends
        </h2>
        {trends.map((trend, i) => (
          <Trend
            key={i}
            index={i + 1}
            hashtag={trend.hashtag}
            posts={trend.posts}
          />
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;

const FollowRecommendation: React.FC<IFollowRecommendation> = ({
  id,
  img,
  name,
  username,
  verified,
  session,
  router,
}) => {
  const { isFollowing, toggleFollow } = useFollow(id, session!.user.id);

  return (
    <div className="flex w-full cursor-pointer items-start justify-between rounded-full py-2 text-ligthGray transition-all hover:bg-accent">
      <div onClick={() => router.push(`/user/${id}`)} className="flex gap-2">
        <div className="relative grid h-10 w-10 place-content-center overflow-hidden rounded-full">
          <Image src={img} width={40} height={40} alt={`${name} profile picture`} />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1 text-sm">
            <p>{name}</p>
            {verified && verified === true && (
              <div>
                <Verified />
              </div>
            )}
          </div>
          <p className="text-sm opacity-50">@{username}</p>
        </div>
      </div>
      {isFollowing ? (
        <Button label={"Unfollow"} redOutlineStyle onClick={toggleFollow} />
      ) : (
        <Button label={"Follow"} whiteStyle onClick={toggleFollow} />
      )}
    </div>
  );
};

const Trend: React.FC<ITrend> = ({ index, category, hashtag, posts }) => {
  return (
    <div className="hover:bg-accents px-4 py-2">
      <small className="space-x-1 text-secondaryText">
        <span>{index}</span>
        {category && (
          <>
            <span>•</span>
            <span>{category}</span>
          </>
        )}
        <span>•</span>
        <span>Trending</span>
      </small>
      <h3 className="font-bold text-ligthGray">#{hashtag}</h3>
      <small className="text-secondaryText">{posts} posts</small>
    </div>
  );
};
