"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileView = () => {
  const pathname = usePathname();
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src="./icons/hamburger.svg"
            width={30}
            height={30}
            className="cursor-pointer"
            alt="menu"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-black-1">
          <Link href="/" className="flex  items-center gap-1 pb-10 pl-4">
            <Image src="/icons/logos.png" alt="logo" width={37} height={37} />
            <h1 className="text-24 font-extrabold text-white-1 ml-2">
              Bablozic
            </h1>
          </Link>
          <div className=" flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 text-white-1">
                {sidebarLinks.map(({ label, route, imgURL }) => {
                  const isActive =
                    pathname === route || pathname.startsWith(`${route}/`);
                  return (
                    <SheetClose asChild key={route}>
                      <Link
                        href={route}
                        className={cn(
                          "flex gap-3 items-center py-4 max-lg:px-4 justify-start",
                          {
                            "bg-nav-focus border-r-4 border-orange-1": isActive,
                          }
                        )}
                      >
                        <Image
                          src={imgURL}
                          alt={label}
                          width={24}
                          height={27}
                        />
                        <p className="">{label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileView;
