export async function fetchCommunity(body) {
  return await useHttp.post('/fetchCommunity', {
    baseURL: import.meta.env.VITE_BASEURL,
    secret: import.meta.env.VITE_BASE_SECRET,
    body
  })
}

// 刷新Token
export async function fetchToken(body) {
  return await useHttp.post('fetchToken', {
    baseURL: import.meta.env.VITE_BASE_URL_USER,
    secret: import.meta.env.VITE_BASE_USER_SECRET,
    body
  })
}
