export default defineNuxtRouteMiddleware((to) => {
  const store = useUserStore()
  // 未登录，导航到登录页
  if (!store.isLogin) {
    return navigateTo('/login?redirect=' + to.path)
  }
})
