import api from "./axios";

export const getNotificationsRequest = () => {
  return api.get("/notification");
};
export const markNotificationAsReadRequest = (notificationId) => {
  return api.patch(`/notification/${notificationId}/read`);
};
