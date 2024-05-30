"use client";

import Button from "@/components/button";
import { useSearchChannels } from "@/components/hooks/channels/useSearchChannels";
import useLocalUser from "@/components/hooks/user/useUser";
import Input from "@/components/input";
import { useClerk, useUser } from "@clerk/nextjs";
import { type Channel } from "@prisma/client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export const SearchItem = ({ channel }: { channel: Channel }) => {
  return (
    <li className="w-full">
      <Link href={`/@${channel.username}`}>
        <p className="text-sm">@{channel.name}</p>
      </Link>
    </li>
  );
};
export default function LandingHeader() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { signOut } = useClerk();
  const { user, isSignedIn, isLoaded } = useUser();
  const { isSuccess, data: localUser, isPending } = useLocalUser();
  const { data: channelsList, refetch } = useSearchChannels(search);

  const onDisplayAuthentication = (typeOfModal: "register" | "login") => {
    const newParams = new URLSearchParams(params.toString());
    newParams.append(
      typeOfModal === "register" ? "showSignup" : "showLogin",
      "true"
    );
    router.replace(`${pathname}?${newParams}`);
  };

  const turnOffNotifications = () => localStorage.setItem("notif", "off");

  useEffect(() => {
    if (search.length > 0) {
      refetch();
    }
  }, [search]);

  return (
    <header className="w-full py-2 px-5 border-b border-slate-100 flex flex-row justify-between items-center">
      <div className="flex relative w-[250px] flex-row justify-start items-center">
        <FiSearch
          size={16}
          strokeWidth={2}
          className="text-black absolute left-2"
        />
        <Input
          type="text"
          placeholderText="Type your search here"
          className="pl-8 w-full"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        {channelsList?.data &&
          search.length > 0 &&
          channelsList?.data?.length > 0 && (
            <ul className="absolute flex flex-col bg-white -bottom-11 border border-slate-100 rounded shadow-input w-full max-w-[320px] py-2 px-2 ">
              {channelsList?.data?.map((channel: Channel) => (
                <SearchItem
                  channel={channel}
                  key={`search_item_${channel.id}`}
                />
              ))}
            </ul>
          )}
      </div>
      {!isSignedIn || !isLoaded ? (
        <div className="flex flex-row h-5 justify-start space-x-2 items-center">
          <Button
            type="button"
            className="h-7 text-[.8rem]"
            variant={"link"}
            onClick={() => onDisplayAuthentication("login")}
          >
            Log In
          </Button>
          <Button
            type="button"
            className="h-7"
            onClick={() => onDisplayAuthentication("register")}
          >
            Sign Up
          </Button>
        </div>
      ) : (
        <div className="flex flex-row h-5 text-sm justify-start space-x-2 items-center">
          <div className="flex flex-row justify-start items-center space-x-2">
            <Button
              variant={"link"}
              className="font-normal"
              onClick={() => turnOffNotifications()}
            >
              Turn off notifications
            </Button>
            <Button
              variant={"link"}
              className="font-normal"
              onClick={() => signOut()}
            >
              Logout
            </Button>
            {!isPending ? (
              isSuccess && !localUser.data ? (
                user?.emailAddresses[0].emailAddress!
              ) : (
                <Link
                  href={`/@${localUser?.data.name}`}
                >{`@${localUser?.data.name}`}</Link>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </header>
  );
}
