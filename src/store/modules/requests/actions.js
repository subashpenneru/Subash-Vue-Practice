import axios from '../../../axios';

export default {
  async contactCoach(context, { email, message, coachId }) {
    const newRequest = {
      email,
      message,
    };

    try {
      const { data } = await axios.post(
        `requests/${coachId}.json`,
        newRequest,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      newRequest.id = data.name;
      newRequest.coachId = coachId;
      context.commit('addRequest', newRequest);
    } catch (e) {
      throw new Error(
        e?.response?.data?.error || 'contactcoach details not uploaded!',
      );
    }
  },
  async fetchRequests(context) {
    const { userId: coachId, token } = context.rootGetters;

    try {
      const { data } = await axios.get(
        `requests/${coachId}.json?auth=${token}`,
      );

      if (!data) {
        throw new Error('No requests found!');
      }

      const requests = Object.keys(data).map(key => ({
        id: key,
        coachId,
        ...data[key],
      }));

      context.commit('setRequests', requests);
    } catch (e) {
      throw new Error(
        e.message || e?.response?.data?.error || 'Failed to fetch requests',
      );
    }
  },
};
