import { CONVERT_LANG } from "@/lib/utils";
import Icon from "../icon";

const BUTTON_BASE_CLASSES =
  "h-full w-[50px] center border border-black/20 dark:border-white/15 border-dashed rounded hover:bg-white/5 transition-colors cursor-pointer";

const ActionButton = ({ onClick, icon, isActive }) => (
  <button
    onClick={onClick}
    className={`${BUTTON_BASE_CLASSES} ${
      isActive ? "bg-black/10 dark:bg-white/10" : ""
    }`}
  >
    <Icon icon={icon} size={25} />
  </button>
);

export function ActionButtons({ openModal, server, lang }) {
  const MODAL_CONFIGS = [
    {
      icon: "solar:face-scan-square-bold",
      titleKey: ["İletişim", "Contact"],
      position: "bottom",
      id: "CONTACT",
      data: server,
    },
    {
      titleKey: ["Ayarlar", "Settings"],
      icon: "solar:settings-bold",
      id: "SETTINGS",
    },
  ];

  return (
    <div className="h-full flex items-center space-x-2">
      {MODAL_CONFIGS.map(({ id, titleKey, icon, position, data }) => (
        <ActionButton
          onClick={() =>
            openModal(
              id,
              CONVERT_LANG(lang, titleKey[0], titleKey[1]),
              position,
              data
            )
          }
          icon={icon}
          key={id}
        />
      ))}
    </div>
  );
}
