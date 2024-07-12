import React, { useRef, useState } from "react";
import { UploadMusic } from "@/types";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";

const UploadMusicFiles = ({
  setMusic,
  setMusicStorageId,
  music,
  setAudioDuration,
  duration,
}: UploadMusic) => {
  const [isGenerateImage, setIsGenerateImage] = useState(false);
  const musicRef = useRef<HTMLInputElement>(null);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getMusicUrl = useMutation(api.musics.getUrl);
  const { toast } = useToast();

  const handleMusic = async (blob: Blob, fileName: string) => {
    setIsGenerateImage(true);
    try {
      const file = new File([blob], fileName, { type: "audio/mpeg" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as { storageId: Id<"_storage"> })
        .storageId;

      setMusicStorageId(storageId);

      const musicUrl = await getMusicUrl({ storageId });
      setMusic(musicUrl!);
      setIsGenerateImage(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error creating a music",
        variant: "destructive",
      });
    }
  };

  const uploadMusic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));
      handleMusic(blob, file.name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="image_div" onClick={() => musicRef?.current?.click()}>
        <Input
          type="file"
          className="hidden"
          ref={musicRef}
          onChange={(e) => uploadMusic(e)}
        />

        {!isGenerateImage ? (
          <Image
            src="/icons/upload-image.svg"
            width={40}
            height={40}
            alt="upload"
          />
        ) : (
          <div className="flex text-white-1">
            Uploading
            <Loader size={20} className="animate-spin ml-2" />
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-12 font-bold text-orange-1">Click to upload</h2>
          <p className="text-12 font-normal text-gray-1">
            mp3, mp4, or GIF (max. 1080x1080px)
          </p>
        </div>
      </div>
      {music && (
        <div className="flex-center w-full">
          <audio
            controls
            src={music}
            autoPlay
            className="mt-5"
            onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
          />
        </div>
      )}
    </>
  );
};

export default UploadMusicFiles;
