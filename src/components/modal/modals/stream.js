import React from "react";

export default function Stream({ name }) {
  if (!name) return null;

  return (
    <div className="w-[800px] h-[450px] bg-orange-50">
      <iframe
        src={`https://player.kick.com/${name}?autoplay=true`}
        allowFullScreen={true}
        scrolling="no"
        height="100%"
        width="100%"
        frameBorder="0"
      ></iframe>
    </div>
  );
}
