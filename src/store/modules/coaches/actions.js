import axios from '../../../axios';

export default {
  async registerCoach(
    context,
    { firstName, lastName, description, rate, areas },
  ) {
    const { userId, token } = context.rootGetters;
    const coachData = {
      firstName,
      lastName,
      description,
      areas,
      hourlyRate: rate,
    };

    try {
      await axios.put(`coaches/${userId}.json?auth=${token}`, coachData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      context.commit('registerCoach', { ...coachData, id: userId });
    } catch (e) {
      console.log(e.message);
    }
  },
  async loadCoaches(context, { forceRefresh }) {
    const { shouldUpdate } = context.getters;

    if (!forceRefresh && !shouldUpdate) {
      return;
    }

    try {
      const { data } = await axios.get(`coaches.json`);

      if (!data) {
        throw new Error('No coaches found!');
      }

      const coaches = Object.keys(data).map(key => ({
        ...data[key],
        id: key,
      }));

      context.commit('setCoaches', coaches);
      context.commit('setFetchTimestamp');
    } catch (e) {
      throw new Error(
        e.message || e?.response?.data?.error || 'Failed to fetch coaches',
      );
    }
  },
};
