import { CONVERT_LANG } from "@/lib/utils";
import Icon from "../icon";

const BUTTON_BASE_CLASSES =
  "h-full w-[50px] center border border-black/20 dark:border-white/15 rounded hover:bg-white/5 transition-colors cursor-pointer";

const MODAL_CONFIGS = [
  {
    id: "SETTINGS",
    titleKey: ["Ayarlar", "Settings"],
    icon: "solar:settings-bold-duotone",
  },
  {
    id: "PANEL",
    titleKey: ["Panel", "Ayarlar"],
    icon: "solar:crown-star-bold-duotone",
  },
];

const ActionButton = ({ onClick, icon, tooltip, isActive }) => (
  <button
    onClick={onClick}
    className={`${BUTTON_BASE_CLASSES} ${isActive ? "bg-white/10" : ""}`}
  >
    <Icon icon={icon} size={25} />
  </button>
);

export const ActionButtons = ({ openModal, lang }) => (
  <div className="h-full flex items-center space-x-2">
    {MODAL_CONFIGS.map(({ id, titleKey, icon, position }) => (
      <ActionButton
        onClick={() =>
          openModal(id, CONVERT_LANG(lang, titleKey[0], titleKey[1]), position)
        }
        icon={icon}
        key={id}
      />
    ))}
  </div>
);
