"use client";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import MusicCard from "@/components/MusicCard";
import Searchbar from "@/components/Searchbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const Discover = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const musicData = useQuery(api.musics.getMusicBySearch, {
    search: search || "",
  });

  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!search ? "Discover Trending musics" : "Search results for "}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {musicData ? (
          <>
            {musicData.length > 0 ? (
              <div className="podcast_grid">
                {musicData?.map(
                  ({ _id, musicTitle, musicDescription, imageUrl }) => (
                    <MusicCard
                      key={_id}
                      imgUrl={imageUrl!}
                      title={musicTitle}
                      description={musicDescription}
                      musicId={_id}
                    />
                  )
                )}
              </div>
            ) : (
              <EmptyState title="No results found" />
            )}
          </>
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </div>
  );
};

export default Discover;
