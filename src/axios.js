import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://vue-demo-5595-default-rtdb.firebaseio.com/',
});

export default instance;
