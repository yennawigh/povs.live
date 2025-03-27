import { CALCULATE_UPTIME, CONVERT_GAME } from "@/lib/utils";

export const streamerService = {
  async getKickStreamerInfo(username) {
    try {
      const response = await fetch(
        `https://kick.com/api/v2/channels/${username}`
      );

      if (!response.ok) {
        throw new Error(`Channel HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        avatar:
          data.user?.profile_pic ||
          "https://files.kick.com/images/user/19420094/profile_image/conversion/default2-fullsize.webp",
        createdAt: CALCULATE_UPTIME(data.user?.email_verified_at) || null,
        game: CONVERT_GAME(data.livestream?.categories?.[0]?.name) || "",
        startedAt: data.livestream?.start_time || null,
        viewers: data.livestream?.viewer_count || 0,
        title: data.livestream?.session_title || "",
        name: data.user?.username || username,
        followers: data.followers_count || 0,
        verified: data.verified || false,
        bio: data.user?.bio || "",
        live: !!data.livestream,
        platform: "kick",
        id: data.id,
      };
    } catch (error) {
      console.error(`Error fetching Kick streamer ${username}:`, error);
      return {
        avatar:
          "https://files.kick.com/images/user/19420094/profile_image/conversion/default2-fullsize.webp",
        platform: "kick",
        createdAt: null,
        startedAt: null,
        verified: false,
        name: username,
        followers: 0,
        live: false,
        viewers: 0,
        title: "",
        game: "",
        bio: "",
      };
    }
  },

  async getMultipleStreamersInfo(usernames) {
    const promises = usernames.map(username => 
      this.getKickStreamerInfo(username)
    );
    
    try {
      const results = await Promise.all(promises);
      return results.reduce((acc, info, index) => {
        acc[`${usernames[index]}-kick`] = info;
        return acc;
      }, {});
    } catch (error) {
      console.error('Error fetching multiple streamers:', error);
      return {};
    }
  }
};
