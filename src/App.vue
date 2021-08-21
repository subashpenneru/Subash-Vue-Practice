<template>
  <section class="container">
    <user-data :firstName="firstName" :lastName="lastName"></user-data>
    <p>{{ uName }}</p>
    <button @click="setNewAge">Change Age</button>
    <div>
      <input type="text" placeholder="First Name" v-model="firstName" />
      <input type="text" placeholder="Last Name" ref="lastNameInp" />
      <button @click="setLastName">Set LastName</button>
    </div>
  </section>
</template>

<script>
import { reactive, ref, computed, watch, provide } from 'vue';

import UserData from './components/UserData.vue';

export default {
  components: {
    UserData
  },
  setup() {
    /**PROPERTIES */
    const user = reactive({ name: 'Subash', age: 27 });
    const firstName = ref('');
    const lastName = ref('');
    const lastNameInp = ref(null);
    const uAge = ref(27);

    /**FUNCTIONS */
    const setNewAge = () => {
      user.age = 32;
      uAge.value = 32;
    };
    const setLastName = () => {
      lastName.value = lastNameInp.value.value;
    };

    /**COMPUTED */
    const uName = computed(() => `${firstName.value} ${lastName.value}`);

    /**WATCH */
    watch([uAge, uName], (newVal, oldVal) => {
      console.log(oldVal, newVal);
    });

    /**PROVIDE */
    provide('userAge', uAge);

    return {
      userName: user.name,
      age: user.age,
      user,
      uAge,
      setNewAge,
      firstName,
      lastName,
      uName,
      lastNameInp,
      setLastName
    };
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>
