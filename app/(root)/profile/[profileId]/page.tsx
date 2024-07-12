"use client";

import { useQuery } from "convex/react";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import MusicCard from "@/components/MusicCard";
import ProfileCard from "@/components/ProfileCard";
import { api } from "@/convex/_generated/api";

const ProfilePage = ({
  params,
}: {
  params: {
    profileId: string;
  };
}) => {
  const user = useQuery(api.user.getUserById, {
    clerkId: params.profileId,
  });
  const musicsData = useQuery(api.musics.getMusicByUserId, {
    authorId: params.profileId,
  });
  console.log(musicsData)

  if (!user || !musicsData) return <LoaderSpinner />;

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
        <ProfileCard
          musicsData={musicsData!}
          imageUrl={user?.imageUrl!}
          userFirstName={user?.name!}
        />
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {musicsData && musicsData.musics.length > 0 ? (
          <div className="podcast_grid">
            {musicsData?.musics
              ?.slice(0, 4)
              .map((music) => (
                <MusicCard
                  key={music._id}
                  imgUrl={music.imageUrl!}
                  title={music.musicTitle!}
                  description={music.musicDescription}
                  musicId={music._id}
                />
              ))}
          </div>
        ) : (
          <EmptyState
            title="You have not created any podcasts yet"
            buttonLink="/create-podcast"
            buttonText="Create Podcast"
          />
        )}
      </section>
    </section>
  );
};

export default ProfilePage;