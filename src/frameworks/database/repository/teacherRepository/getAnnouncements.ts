import announcementModel from "../../models/announcementModel";

export const getAnnouncements = async () => {
    try {
      const announcements = await announcementModel.find();
      return announcements;
    } catch (error) {
      console.error("Error occurred while fetching announcements:", error);
      throw new Error("Failed to fetch announcements");
    }
  };
  