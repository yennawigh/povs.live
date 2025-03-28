"use client";

import Icon from "@/components/icon";
import { useServers } from "@/hooks/useServers";
import Link from "next/link";

export default function Home() {
  const { servers, loading } = useServers();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <main className="w-screen h-screen center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white dark:text-white">
        {servers.map((server) => (
          <Link
            style={{
              backgroundImage: `url(${server.LOGO})`,
            }}
            className="h-72 w-72 bg-center bg-no-repeat bg-cover rounded-md relative overflow-hidden group"
            href={`/${server.NAME.toLowerCase()}`}
            key={server.NAME}
          >
            <Icon
              className="hidden group-hover:flex absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 z-10"
              icon={"solar:square-arrow-right-up-bold"}
              color={"white"}
              size={100}
            />
            <div className="absolute bottom-1 left-1 right-1 bg-white/30 dark:bg-black/30 backdrop-blur-lg flex items-center justify-between rounded p-2">
              <h3 className=" font-bold">{server.NAME}</h3>
              <p className="text-xs">{server.STREAMERS.kick.length} yayıncı</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
