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
    return await axios.post(`${process.env.VUE_APP_API_PROXY_TARGET}/meetups`, {
      meetup
    });
  },
  async updateMeetup(meetupId, meetup) {
    return await axios.put(
      `${process.env.VUE_APP_API_PROXY_TARGET}/meetups/${meetupId}`,
      {
        meetup
      }
    );
  },
  async deleteMeetup(meetupId) {
    try {
      const request = await axios.delete(
        `${process.env.VUE_APP_API_PROXY_TARGET}/meetups/${meetupId}`
      );
      return await request.json();
    } catch (err) {
      console.log(err.message);
    }
  },
  async attend(meetupId) {
    try {
      const request = await axios.put(
        `${process.env.VUE_APP_API_PROXY_TARGET}/meetups/${meetupId}/participation`
      );
      return await request.json();
    } catch (err) {
      console.log(err.message);
    }
  },
  async leave(meetupId) {
    try {
      const request = await axios.delete(
        `${process.env.API_URL}/meetups/${meetupId}/participation`
      );
      return await request.json();
    } catch (err) {
      console.log(err.message);
    }
  }
};
