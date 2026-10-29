import React from 'react'
import { useEffect, useState } from 'react'
import { productsApi } from '../api/api'
import { formatPrice } from '../utils/format'
import Loader from '../components/Loader'
export default function AdminProducts() {
  const [products, setProducts] = useState([]); const [loading, setLoading] = useState(true); const [search, setSearch] = useState('')
  useEffect(() => { productsApi.getAll({ limit: 100 }).then(data => setProducts(data.products)).finally(() => setLoading(false)) }, [])
  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="page">
      <h1 className="page-title">Админ-панель: товары</h1>
      <div className="toolbar"><input className="search-input" placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)} /></div>
      {loading ? <Loader /> : <div className="table-wrap"><table><thead><tr><th>ID</th><th>Название</th><th>Цена</th><th>Остаток</th></tr></thead><tbody>{filtered.map(p => <tr key={p.id}><td>{p.id}</td><td>{p.title}</td><td>{formatPrice(p.price)}</td><td>{p.stock}</td></tr>)}</tbody></table></div>}
    </div>
  )
}
