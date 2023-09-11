import axios from "axios";

export const MeetupsAPI = {
  async fetchMeetups() {
    return await axios.get(`${process.env.VUE_APP_API_URL}/meetups`);
  },
  async fetchMeetup(meetupId) {
    return await axios.get(
      `${process.env.VUE_APP_API_URL}/meetups/${meetupId}`
    );
  },
  async createMeetup(meetup) {
    return await axios.post(`${process.env.VUE_APP_API_URL}/meetups`, meetup);
  },
  async updateMeetup(meetupId, meetup) {
    return await axios.put(
      `${process.env.VUE_APP_API_URL}/meetups/${meetupId}`,
      meetup
    );
  },
  async deleteMeetup(meetupId) {
    return await axios.delete(
      `${process.env.VUE_APP_API_URL}/meetups/${meetupId}`
    );
  },
  async attend(meetupId) {
    return await axios.put(
      `${process.env.VUE_APP_API_URL}/meetups/${meetupId}/participation`
    );
  },
  async leave(meetupId) {
    return await axios.delete(
      `${process.env.VUE_APP_API_URL}/meetups/${meetupId}/participation`
    );
  }
};
