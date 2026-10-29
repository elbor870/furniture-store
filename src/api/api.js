const BASE_URL = 'https://dummyjson.com'
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options })
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || `Ошибка: ${res.status}`) }
  return res.json()
}
export const productsApi = {
  getAll: ({ limit = 12, skip = 0, q = '', category = '', sortBy = '', order = 'asc' } = {}) => {
    if (q) return request(`/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}&delay=400`)
    if (category) return request(`/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}&delay=400`)
    let query = `?limit=${limit}&skip=${skip}&delay=400`
    if (sortBy) query += `&sortBy=${sortBy}&order=${order}`
    return request(`/products${query}`)
  },
  getById: (id) => request(`/products/${id}?delay=300`),
  getCategories: () => request('/products/category-list'),
}
export const ordersApi = {
  getAll: () => request('/carts?limit=30&delay=400'),
  getByUser: (userId) => request(`/carts/user/${userId}?delay=400`),
  create: (payload) => request('/carts/add', { method: 'POST', body: JSON.stringify(payload) }),
}
export const usersApi = {
  login: (username, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password, expiresInMins: 60 }) }),
  register: (payload) => request('/users/add', { method: 'POST', body: JSON.stringify(payload) }),
}
