import axios from "axios";
// import AppToast from '@/components/AppToast';

export const MeetupsAPI = {
  async fetchMeetups() {
    return await axios.get(`${process.env.VUE_APP_API_PROXY_TARGET}/meetups`);
  },
  async fetchMeetup(meetupId) {
    return await axios.get(
      `${process.env.VUE_APP_API_PROXY_TARGET}/meetups/${meetupId}`
    );
  },
  async createMeetup(meetup) {
    return await axios.post(
      `${process.env.VUE_APP_API_PROXY_TARGET}/meetups`,
      meetup
    );
  },
  async updateMeetup(meetupId, meetup) {
    return await axios.put(
      `${process.env.VUE_APP_API_PROXY_TARGET}/meetups/${meetupId}`,
      meetup
    );
  },
  async deleteMeetup(meetupId) {
    return await axios.delete(
      `${process.env.VUE_APP_API_PROXY_TARGET}/meetups/${meetupId}`
    );
  },
  async attend(meetupId) {
    return await axios.put(
      `${process.env.VUE_APP_API_PROXY_TARGET}/meetups/${meetupId}/participation`
    );
  },
  async leave(meetupId) {
    return await axios.delete(
      `${process.env.VUE_APP_API_PROXY_TARGET}/meetups/${meetupId}/participation`
    );
  }
};
