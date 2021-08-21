export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    const { coaches } = state;

    return coaches && coaches.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    const { coaches } = getters;
    const { userId } = rootGetters;

    return coaches.some(coach => coach.id === userId);
  },
  shouldUpdate(state) {
    const { lastFetch } = state;

    if (!lastFetch) {
      return true;
    }

    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetch) / 1000 > 60;
  },
};
