import axiosAnsence from "../api/api.config";
import { endpoints } from "../api/endpoints";

export const createMeeting = async () => {
  const res = await axiosAnsence.get(endpoints.meeting.create);
  return res.data.meetingId;
};
