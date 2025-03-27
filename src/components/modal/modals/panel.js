"use client";

import { apiService } from "@/services/apiService";
import Icon from "@/components/icon";
import { useState } from "react";

export default function Panel(serverInfo) {
  const [formData, setFormData] = useState({
    STREAMERS: serverInfo?.STREAMERS || { twitch: [], kick: [] },
    ANNOUNCEMENT: serverInfo?.ANNOUNCEMENT || "",
    BACKGROUND: serverInfo?.BACKGROUND || "",
    COLOR: serverInfo?.COLOR || "",
    NAME: serverInfo?.NAME || "",
    LOGO: serverInfo?.LOGO || "",
    CODE: serverInfo?.CODE || "",
  });

  const COMMON_STYLES = {
    borderStyle: "border-black/20 dark:border-white/15",
    iconContainer:
      "h-full border-r border-black/20 dark:border-white/15 center w-10 flex-shrink-0",
    statContainer:
      "flex items-center space-x-3 flex-auto w-full h-[38px] border-b border-black/20 dark:border-white/15 last:border-none",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStreamerAdd = (platform) => {
    const username = prompt(`Enter ${platform} username:`);
    if (!username) return;

    setFormData((prev) => ({
      ...prev,
      STREAMERS: {
        ...prev.STREAMERS,
        [platform]: [
          ...(prev.STREAMERS[platform] || []),
          username.toLowerCase(),
        ],
      },
    }));
  };

  const handleStreamerRemove = (platform, username) => {
    setFormData((prev) => ({
      ...prev,
      STREAMERS: {
        ...prev.STREAMERS,
        [platform]: prev.STREAMERS[platform].filter((u) => u !== username),
      },
    }));
  };

  const handleSave = async () => {
    await apiService.updateServerInfo(serverInfo.CODE, formData);
    window.location.reload();
  };

  const StreamerStat = ({ icon, text, onDelete }) => (
    <div className={COMMON_STYLES.statContainer}>
      <div className={COMMON_STYLES.iconContainer}>
        <Icon icon={icon} />
      </div>
      <p className="text-xs line-clamp-1 flex-1">{text}</p>
      <div
        onClick={onDelete}
        className={COMMON_STYLES.iconContainer.replace("border-r", "border-l")}
      >
        <Icon icon={"solar:trash-bin-minimalistic-bold"} />
      </div>
    </div>
  );

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex">
        {/* Sol Panel - Form Alanı */}
        <div className="w-full h-full p-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Temel Bilgiler</h3>
            <input
              type="text"
              name="NAME"
              value={formData.NAME}
              onChange={handleInputChange}
              placeholder="Sunucu Adı"
              className="w-full p-2 rounded bg-transparent dark:bg-transparent border border-black/20 dark:border-white/15"
            />
            <input
              type="text"
              name="LOGO"
              value={formData.LOGO}
              onChange={handleInputChange}
              placeholder="Logo URL"
              className="w-full p-2 rounded bg-transparent dark:bg-transparent border border-black/20 dark:border-white/15"
            />
            <input
              type="text"
              name="BACKGROUND"
              value={formData.BACKGROUND}
              onChange={handleInputChange}
              placeholder="Arkaplan URL"
              className="w-full p-2 rounded bg-transparent dark:bg-transparent border border-black/20 dark:border-white/15"
            />
            <input
              type="text"
              name="COLOR"
              value={formData.COLOR}
              onChange={handleInputChange}
              placeholder="Tema Rengi (Hex)"
              className="w-full p-2 rounded bg-transparent dark:bg-transparent border border-black/20 dark:border-white/15"
            />
            <textarea
              name="ANNOUNCEMENT"
              value={formData.ANNOUNCEMENT}
              onChange={handleInputChange}
              placeholder="Duyuru Metni"
              className="w-full p-2 rounded bg-transparent dark:bg-transparent border border-black/20 dark:border-white/15 h-24 resize-none"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Değişiklikleri Kaydet
          </button>
        </div>

        <div className="w-96 h-full overflow-hidden overflow-y-auto border-l border-black/20 dark:border-white/15">
          <div className="border-b border-black/20 dark:border-white/15 p-2">
            <h3 className="text-lg font-bold uppercase text-center">
              Yayıncılar
            </h3>
          </div>
          <div className="flex space-x-2 p-2 border-b border-black/20 dark:border-white/15">
            <button
              onClick={() => handleStreamerAdd("kick")}
              className="flex-1 bg-green-500 text-white py-1.5 rounded text-sm hover:bg-green-600 transition-colors"
            >
              Kick Ekle
            </button>
          </div>
          {formData.STREAMERS?.kick?.map((username, index) => (
            <StreamerStat
              key={index}
              icon="solar:user-rounded-bold"
              text={username}
              onDelete={() => handleStreamerRemove("kick", username)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
