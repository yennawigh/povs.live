import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="w-screen h-screen center">
      <Link
        className="text-xl lowercase hover:underline"
        href="/venny"
      >
        Venny sunucusuna git
      </Link>
    </div>
  );
}
