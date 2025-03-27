"use client";

import { apiService } from "@/services/apiService";
import Icon from "@/components/icon";
import { useState } from "react";

export default function Panel({ serverInfo = {} }) {
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
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="NAME"
          value={formData.NAME}
          onChange={handleInputChange}
          placeholder="Server Name"
          className="dark:bg-white/5yo bg-black/10 rounded"
        />
        <input
          name="LOGO"
          value={formData.LOGO}
          onChange={handleInputChange}
          placeholder="Logo URL"
          className="dark:bg-white/5yo bg-black/10 rounded"
        />
        <input
          name="COLOR"
          value={formData.COLOR}
          onChange={handleInputChange}
          placeholder="Theme Color"
          className="dark:bg-white/5yo bg-black/10 rounded"
        />
        <input
          name="BACKGROUND"
          value={formData.BACKGROUND}
          onChange={handleInputChange}
          placeholder="Background URL"
          className="dark:bg-white/5yo bg-black/10 rounded"
        />
      </div>

      <textarea
        name="ANNOUNCEMENT"
        value={formData.ANNOUNCEMENT}
        onChange={handleInputChange}
        placeholder="Announcement"
        className="input w-full h-24"
      />

      <div className="space-y-2">
        <div className="flex justify-between">
          <h3>Streamers</h3>
          <div className="space-x-2">
            <button onClick={() => handleStreamerAdd("twitch")} className="btn">
              <Icon icon="mdi:twitch" /> Add Twitch
            </button>
            <button onClick={() => handleStreamerAdd("kick")} className="btn">
              <Icon icon="simple-icons:kick" /> Add Kick
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formData.STREAMERS).map(([platform, streamers]) => (
            <div key={platform} className="space-y-2">
              <h4 className="capitalize">{platform}</h4>
              {streamers.map((username) => (
                <div
                  key={username}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <span>{username}</span>
                  <button
                    onClick={() => handleStreamerRemove(platform, username)}
                  >
                    <Icon icon="ph:x-bold" />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="btn w-full">
        Save Changes
      </button>
    </div>
  );
}
