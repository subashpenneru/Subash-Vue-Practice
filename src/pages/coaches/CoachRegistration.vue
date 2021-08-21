<template>
  <section>
    <base-card>
      <h2>Register as a Coach now!</h2>
      <coach-form @save-data="onSaveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
    async onSaveData(data) {
      await this.$store.dispatch('coaches/registerCoach', data);

      this.$router.replace('/coaches');
    },
  },
};
</script>
