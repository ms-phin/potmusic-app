"use client";
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import MusicDetailsPlayer from "@/components/MusicDetailsPlayer";
import MusicCard from "@/components/MusicCard";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const PodcastDetails = ({
  params: { musicId },
}: {
  params: {
    musicId: Id<"musics">;
  };
}) => {
  const music = useQuery(api.musics.getMusicById, { musicId });
  //   const router = useRouter();
  const { user } = useUser();
  const similarMusic = useQuery(api.musics.getMusicByAuthorId, { musicId });
  const isOwner = user?.id === music?.authorId;
  if (!music || !similarMusic) {
    return <LoaderSpinner />;
  }

  return (
    <section className="flex w-full flex-col">
      <header className="flex mt-9 items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Current Playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          <h2 className="text-16 font-bold text-white-1">{music?.views}</h2>
        </figure>
      </header>
      <MusicDetailsPlayer isOwner={isOwner} musicId={music._id} {...music} />
      <p
        className="text-white-1 text-16 pb-8 pt-[45px] font-medium
        max-md:text-center"
      >
        {music?.musicDescription}
      </p>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2">
            {music?.musicDescription}
          </p>
        </div>
      </div>
      <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">
          Similar musics
          {similarMusic && similarMusic.length > 0 ? (
            <div className="podcast_grid">
              {similarMusic?.map(
                ({ _id, imageUrl, musicDescription, musicTitle }) => (
                  <MusicCard
                    key={_id}
                    imgUrl={imageUrl}
                    description={musicDescription}
                    title={musicTitle}
                    musicId={_id}
                  />
                )
              )}
            </div>
          ) : (
            <>
              <EmptyState
                title="No similar muscs found"
                buttonLink="/discover"
                buttonText="Descover more musics"
              />
            </>
          )}
        </h1>
      </section>
    </section>
  );
};

export default PodcastDetails;
