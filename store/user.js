export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'DirtyWei',
    age: 12,
    isLogin: false
  }),
  getters: {
    doubleAge: (state) => state.age * 2
  },
  actions: {
    increment() {
      this.age++
    }
  }
})
