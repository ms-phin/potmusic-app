import React from "react";
import Image from "next/image";
import { MusicCardProps } from "@/types";
import { useRouter } from "next/navigation";

const MusicCard = ({ musicId, imgUrl, description, title }: MusicCardProps) => {
  const router = useRouter();

  const handleViews = () => {
    // increase views
    router.push(`/musics/${musicId}`, {
      scroll: true,
    });
  };

  return (
    <div className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col">
        <div className="relative w-[230px] h-[230px]">
          <Image
            src={imgUrl ?? ""}
            layout="fill"
            objectFit="cover"
            alt={title}
            className="rounded-xl"
            quality={100}
          />
        </div>
        <div>
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <h2 className="text-12 truncate font-normal capitalize text-white-4">
            {description}
          </h2>
        </div>
      </figure>
    </div>
  );
};

export default MusicCard;
