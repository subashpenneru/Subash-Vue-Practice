export default {
  increment(context) {
    setTimeout(() => {
      context.commit('increment');
    }, 2000);
  },
  increase(context, { value }) {
    context.commit('increase', { value });
  }
};
