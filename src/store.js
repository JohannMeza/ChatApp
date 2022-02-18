// import Vue from 'vue';
import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    id: '',
    user: {},
    groups: {},
    contacts: []
  },
  mutations: {
    saveDataUser: (state) => {
      state.user;
    }
  },
  actions: {
    saveCommit: ( context ) => {
      context.commit('saveDataUser')
    }
  },
  getters: {

  }
})
