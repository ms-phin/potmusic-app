import { Id } from "@/convex/_generated/dataModel";
import React, { Dispatch, SetStateAction } from "react";

export interface GenerateThumbnailProps {
  setImage: React.Dispatch<SetStateAction<string>>;
  setImageStorageId: React.Dispatch<
    React.SetStateAction<Id<"_storage"> | null>
  >;
  image: string;
  imagePrompt: string;
  setImagePrompt: React.Dispatch<React.SetStateAction<string>>;
}

export interface UploadMusic {
  setMusic: React.Dispatch<SetStateAction<string>>;
  setMusicStorageId: React.Dispatch<
    React.SetStateAction<Id<"_storage"> | null>
  >;
  music: string;
  setAudioDuration: React.Dispatch<SetStateAction<number>>;
  duration: number;
}
export interface MusicCardProps {
  imgUrl?: string;
  title: string;
  description: string;
  musicId: Id<"musics">;
}
export interface EmptyStateProps {
  title: string;
  search?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export interface MusicDetailPlayerProps {
  audioUrl?: string;
  musicTitle: string;
  author: string;
  isOwner: boolean;
  imageUrl?: string;
  musicId: Id<"musics">;
  imageStorageId?: Id<"_storage">;
  audioStorageId?: Id<"_storage">;
  authorImageUrl?: string;
  authorId: string;
}
export interface TopMusicsProps {
  _id: Id<"users">;
  _creationTime: number;
  email: string;
  imageUrl: string;
  clerkId: string;
  name: string;
  music: {
    musicTitle: string;
    musicId: Id<"musics">;
  }[];
  totalMusics: number;
}
export interface CarouselProps {
  LikesDetail: TopMusicsProps[];
}

export interface AudioProps {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
  musicId: string;
}

export interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

export interface MusicProps {
  _id: Id<"musics">;
  _creationTime: number;
  audioStorageId?: Id<"_storage">;
  user: Id<"users">;
  musicTitle: string;
  musicDescription: string;
  audioUrl?: string;
  imageUrl?: string;
  imageStorageId?: Id<"_storage">;
  author: string;
  authorId: string;
  authorImageUrl?: string;
  // voicePrompt: string;
  imagePrompt: string | null;
  // voiceType: string;
  audioDuration: number;
  views: number;
}

export interface ProfileMusicProps {
  musics: MusicProps[];
  listeners: number;
}

export interface ProfileCardProps {
  musicsData: ProfileMusicProps;
  imageUrl: string;
  userFirstName: string;
}
