export default {
  finalCounter(state) {
    return state.counter;
  },
  normalizedCounter(state, getters) {
    const { finalCounter } = getters;

    return finalCounter < 0 ? 0 : finalCounter > 100 ? 100 : finalCounter;
  }
};
