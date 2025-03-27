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

  return (
   <div className="w-full h-full"></div>
  );
}
