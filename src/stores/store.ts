// stores/counter.js
import { defineStore } from 'pinia'

let loggedIn = localStorage.getItem('token') ? localStorage.getItem('token') : false

export const useAuthStore = defineStore('loggedIn', {
  state: () => {
    return {loggedIn}
  },
  actions: {
    changeState(value: any) {
      this.loggedIn = value
    },
  },
})