import Icon from "../icon";

export default function Announcement({ server }) {
  if (!server || !server.ANNOUNCEMENT || server.ANNOUNCEMENT === "")
    return null;

  return (
    <div className="flex items-center w-full h-[38px] border-b border-black/20 dark:border-white/15">
      <div className="h-full border-r border-black/20 dark:border-white/15 center w-24 px-3">
        <p className="font-bold">DUYURU</p>
      </div>
      <div className="h-full border-r border-black/20 dark:border-white/15 center w-10 flex-shrink-0">
        <Icon icon={"bxs:megaphone"} />
      </div>
      <p className="px-3">{server.ANNOUNCEMENT}</p>
    </div>
  );
}
