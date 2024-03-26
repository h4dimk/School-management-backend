import announcementModel from "../../models/announcementModel";
import { IAnnouncement } from "../../../../entities/announcementEntity";

export const addAnnouncement = async (announcementData: IAnnouncement) => {
  try {
    const savedAnnouncement = await announcementModel.create(announcementData);
    return savedAnnouncement;
  } catch (error) {
    console.error("Error adding announcement:", error);
    throw new Error("Failed to add announcement");
  }
};

export const removeAnnouncement = async (announcementId: string) => {
  try {
    const deletedAnnouncement = await announcementModel.findByIdAndDelete(
      announcementId
    );

    if (!deletedAnnouncement) {
      throw new Error("Announcement not found");
    }

    return deletedAnnouncement;
  } catch (error) {
    console.error("Error removing announcement:", error);
    throw new Error("Failed to remove announcement");
  }
};

export const getAnnouncements = async () => {
  try {
    const announcements = await announcementModel.find();
    return announcements;
  } catch (error) {
    console.error("Error occurred while fetching announcements:", error);
    throw new Error("Failed to fetch announcements");
  }
};
