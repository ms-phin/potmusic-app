import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
import MusicPlayer from "@/components/MusicPlayer";
import MobileView from "@/components/MobileView";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col">
            <div className="flex h-16  items-center justify-between md:hidden">
              <Image
                src="/icons/logos.png"
                width={30}
                height={30}
                alt="menu-icon"
              />
              <MobileView />
            </div>
            <div className="flex flex-col">
              <Toaster />
              {children}
            </div>
          </div>
        </section>

        <RightSideBar />
      </main>
      <MusicPlayer />
    </div>
  );
}
