// import Vue from 'vue';
import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    user: {} 
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
