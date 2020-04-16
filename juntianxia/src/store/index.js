import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store(
  {
    state: {
      codeUrl:'',

    },
    mutations: {
      tocode(state,newdata){
        state.codeUrl=newdata
        console.log(state.codeUrl);
      }
    },
    actions: {

    },
    getters: {

    }
  })
