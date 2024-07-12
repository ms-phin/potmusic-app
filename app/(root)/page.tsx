"use client";
import React from "react";
// import { podcastData } from "@/constants";
import MusicCard from "@/components/MusicCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Home = () => {
  const musics = useQuery(api.musics.getMusic);

  // console.log(tasks);

  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Music</h1>

        <div className="podcast_grid">
          {musics?.map(({ _id, imageUrl, musicDescription, musicTitle }) => (
            <MusicCard
              key={_id}
              imgUrl={imageUrl}
              description={musicDescription}
              title={musicTitle}
              musicId={_id}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
