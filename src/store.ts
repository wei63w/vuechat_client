import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:'',
    websocket:null,
    userNickName:'',
  },
  mutations: {
    setUserNickName(state,data){
      state.userNickName = data;
    }
  },
  actions: {
    // commitUserNickName:({commit},userNickName) => commit('setUserNickName',userNickName)
  }
})
