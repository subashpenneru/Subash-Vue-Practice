<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExp">Load Submitted Experiences</base-button>
      </div>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="error">{{ error }}</p>
      <ul v-else-if="resultsAvailable">
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.userName"
          :rating="result.rating"
        ></survey-result>
      </ul>
      <p v-else>
        No Stored Experiences found. Start adding some survey results first
      </p>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';

export default {
  components: {
    SurveyResult
  },
  data() {
    return {
      results: [],
      isLoading: false,
      error: null
    };
  },
  computed: {
    resultsAvailable() {
      return this.results && this.results.length > 0;
    }
  },
  async mounted() {
    await this.loadExp();
  },
  methods: {
    async loadExp() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(
          'https://vue-demo-5595-default-rtdb.firebaseio.com/surveys.json'
        );

        if (response.ok) {
          const data = await response.json();

          if (data) {
            this.results = Object.keys(data).map(key => {
              return {
                id: key,
                ...data[key]
              };
            });
          }

          this.isLoading = false;
        }
      } catch (e) {
        console.log(e);
        this.isLoading = false;
        this.error = 'Failed to fetch data - please try again later';
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
