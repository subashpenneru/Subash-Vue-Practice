<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
  </section>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem
  },
  inject: ['users', 'teams'],
  props: ['teamId'],
  data() {
    return {
      teamName: '',
      members: []
    };
  },
  created() {
    this.setMemebers(this.teamId);
  },
  beforeRouteUpdate(to, from, next) {
    // this.setMemebers(to.params.teamId);
    console.log('TeamMembers beforeRouteUpdate()');
    next();
  },
  watch: {
    teamId(value) {
      this.setMemebers(value);
    }
  },
  methods: {
    setMemebers(teamId) {
      const { name, members } = this.teams.find(team => team.id === teamId);
      const reqMembers = [];

      members.forEach(ele => {
        const member = this.users.find(user => user.id === ele);

        if (member) {
          reqMembers.push(member);
        }
      });

      this.teamName = name;
      this.members = reqMembers;
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
