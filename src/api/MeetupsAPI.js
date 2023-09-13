import { get, post, put, deleteEntity } from "@/plugins/firebase";

export const fetchMeetups = async () => {
  try {
    return await get("meetups");
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchMeetup = async meetupId => {
  try {
    return await get("meetups", meetupId);
  } catch (e) {
    throw new Error(e);
  }
};

export const createMeetup = async meetup => {
  try {
    return await post("meetups", meetup.id, meetup);
  } catch (e) {
    throw new Error(e);
  }
};

export const updateMeetup = async meetup => {
  try {
    return await put("meetups", meetup.id, meetup);
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteMeetup = async meetupId => {
  try {
    return await deleteEntity("meetups", meetupId);
  } catch (e) {
    throw new Error(e);
  }
};
