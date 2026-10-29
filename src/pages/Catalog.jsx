import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productsApi } from '../api/api'
import ProductCard from '../components/ProductCard'
import { SkeletonGrid } from '../components/Loader'
const PAGE_SIZE = 12
export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([]); const [categories, setCategories] = useState([]); const [total, setTotal] = useState(0); const [loading, setLoading] = useState(true)
  const q = searchParams.get('q') || ''; const category = searchParams.get('category') || ''; const sortBy = searchParams.get('sortBy') || ''; const order = searchParams.get('order') || 'asc'; const page = Number(searchParams.get('page') || 0)
  const [searchInput, setSearchInput] = useState(q)
  useEffect(() => { productsApi.getCategories().then(setCategories).catch(() => {}) }, [])
  useEffect(() => { const t = setTimeout(() => { if (searchInput !== q) updateParam('q', searchInput) }, 500); return () => clearTimeout(t) }, [searchInput])
  useEffect(() => {
    let cancelled = false; setLoading(true)
    productsApi.getAll({ limit: PAGE_SIZE, skip: page * PAGE_SIZE, q, category, sortBy, order })
      .then(data => { if (!cancelled) { setProducts(data.products); setTotal(data.total) } })
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [q, category, sortBy, order, page])
  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value); else next.delete(key)
    if (key !== 'page') next.delete('page')
    setSearchParams(next)
  }
  const totalPages = Math.ceil(total / PAGE_SIZE)
  return (
    <div className="page">
      <h1 className="page-title">Каталог товаров</h1><p className="page-subtitle">Найдено: {total}</p>
      <div className="catalog-layout">
        <aside className="filters">
          <h3>Фильтры</h3>
          <div className="filter-group"><label>Поиск</label><input type="search" placeholder="Например: стол" value={searchInput} onChange={e => setSearchInput(e.target.value)} /></div>
          <div className="filter-group"><label>Категория</label><select value={category} onChange={e => updateParam('category', e.target.value)}><option value="">Все категории</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
          <div className="filter-group"><label>Сортировка</label><select value={`${sortBy}|${order}`} onChange={e => { const [sb, o] = e.target.value.split('|'); const next = new URLSearchParams(searchParams); if (sb) { next.set('sortBy', sb); next.set('order', o); } else { next.delete('sortBy'); next.delete('order'); } next.delete('page'); setSearchParams(next); }}><option value="|">По умолчанию</option><option value="price|asc">Цена: по возрастанию</option><option value="price|desc">Цена: по убыванию</option><option value="rating|desc">По рейтингу</option></select></div>
          <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => { setSearchInput(''); setSearchParams({}) }}>Сбросить</button>
        </aside>
        <div>
          {loading ? <SkeletonGrid /> : products.length === 0 ? <div className="empty-state"><h2>Товары не найдены</h2><button className="btn btn-primary" onClick={() => setSearchParams({})}>Сбросить фильтры</button></div> : (
            <>
              <div className="product-grid">{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
              {totalPages > 1 && <div style={{ display: 'flex', gap: 8, marginTop: 32, justifyContent: 'center', flexWrap: 'wrap' }}>{Array.from({ length: totalPages }).slice(0, 10).map((_, i) => <button key={i} className={`btn ${i === page ? 'btn-primary' : 'btn-outline'}`} style={{ minWidth: 44, padding: '8px 12px' }} onClick={() => updateParam('page', i === 0 ? '' : String(i))}>{i + 1}</button>)}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
