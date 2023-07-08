// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s-DirtyWei',
      title: '这是标题',
      charset: 'utf-8',
      htmlAttrs: { lang: 'zh-cn' },
      meta: [
        { name: 'description', content: '这是描述需要替换' },
        { name: 'keywords', content: '关键字,NuxtJS,Nuxt3' }
      ]
    }
  },
  modules: ['@huntersofbook/naive-ui-nuxt', ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs'] }], '@nuxtjs/robots'],
  naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: '#fff',
        primaryColorHover: '#f2f2f2'
      }
    }
  },
  imports: { dirs: ['api', 'store'] }
})
