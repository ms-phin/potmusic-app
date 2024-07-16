"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import UploadMusic from "@/components/UploadMusic";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  MusicDescription: z.string().min(2),
  MusicTitle: z.string().min(2),
});

const CreateMusic = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);

  const [imageUrl, setImageUrl] = useState("");
  const [imagePrompt, setIamgePrompt] = useState("");
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );

  const [audioUrl, setAudioUrl] = useState("");
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const createMusic = useMutation(api.musics.createMusic);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      MusicTitle: "",
      MusicDescription: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if (!audioUrl || !imageUrl) {
        toast({
          title: "please generate audio and image",
        });
        setIsSubmitting(false);
        throw new Error("please generate audio and image");
      }
      const music = await createMusic({
        musicTitle: data.MusicTitle,
        musicDescription: data.MusicDescription,
        audioUrl,
        imageUrl,
        imagePrompt,
        views: 0,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
      });
      toast({
        title: "music created",
      });
      setIsSubmitting(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
    // console.log(values);
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-blod text-white-1">Create Music</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pd-10">
            <FormField
              control={form.control}
              name="MusicTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-orange-1"
                      placeholder="Bebilo Music"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className=" text-white-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MusicDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-orange-1"
                      placeholder="Write Simple Music Descripation"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className=" text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <UploadMusic
              setMusic={setAudioUrl}
              setMusicStorageId={setAudioStorageId}
              music={audioUrl}
              duration={audioDuration}
              setAudioDuration={setAudioDuration}
            />
            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setIamgePrompt}
            />
            <div className="mt-10 w-full">
              <Button
                type="submit"
                className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 tarnsition-all duration-500 hover:bg-black-1"
              >
                {isSubmitting ? (
                  <>
                    SubMitting
                    <Loader size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  "Submit & Publish Music "
                )}
              </Button>
            </div>
          </div>
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </section>
  );
};
export default CreateMusic;
