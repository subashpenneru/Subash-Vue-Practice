import axios from 'axios';

const API_KEY = 'AIzaSyBBV_zfoZUwf2ezqzLxCHmtvMNiysnISp4';
const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const LOGIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
let timer;

export default {
  async authenticate(context, { email, password, mode }) {
    const URL = mode === 'login' ? LOGIN : SIGNUP;
    try {
      const { data } = await axios.post(
        URL,
        { email, password, returnSecureToken: true },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const expiresIn = +data.expiresIn * 1000;
      const expDate = new Date().getTime() + expiresIn;
      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, expiresIn);

      localStorage.setItem('token', data.idToken);
      localStorage.setItem('userId', data.localId);
      localStorage.setItem('tokenExp', expDate);

      context.commit('setUser', {
        token: data.idToken,
        userId: data.localId,
      });
    } catch (e) {
      throw new Error(e?.response?.data?.error?.message || 'signup failed');
    }
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expDate = localStorage.getItem('tokenExp');
    const expiresIn = +expDate - new Date().getTime();

    if (expiresIn < 1) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExp');
    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
