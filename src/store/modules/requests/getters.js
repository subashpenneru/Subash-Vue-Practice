export default {
  requests(state, getters, rootState, rootGetters) {
    const { userId } = rootGetters;
    return state.requests.filter(req => req.coachId === userId);
  },
  hasRequests(state, getters) {
    const { requests } = getters;
    return requests && requests.length > 0;
  },
};
