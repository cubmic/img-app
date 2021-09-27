import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import globals from './globals.js'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      globals
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
    plugins: [createPersistedState({
      storage: window.sessionStorage // use session storage
    })]
  })
  return Store
})
