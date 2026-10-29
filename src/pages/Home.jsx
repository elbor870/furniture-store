import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productsApi } from '../api/api'
import ProductCard from '../components/ProductCard'
import { SkeletonGrid } from '../components/Loader'
export default function Home() {
  const [products, setProducts] = useState([]); const [categories, setCategories] = useState([]); const [loading, setLoading] = useState(true)
  useEffect(() => {
    let cancelled = false
    Promise.all([productsApi.getAll({ limit: 8, sortBy: 'rating', order: 'desc' }), productsApi.getCategories()])
      .then(([list, cats]) => { if (!cancelled) { setProducts(list.products); setCategories(cats.slice(0, 6)) } })
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [])
  return (
    <div className="page">
      <section className="hero"><h1>Мебель, которая создаёт уют</h1><p>Широкий выбор мебели и предметов интерьера. Доставка по всей России.</p><Link to="/catalog" className="btn btn-primary">Перейти в каталог →</Link></section>
      <section style={{ marginBottom: 48 }}><h2 className="page-title">Категории</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginTop: 16 }}>{categories.map(c => <Link key={c} to={`/catalog?category=${c}`} className="btn btn-outline" style={{ textTransform: 'capitalize' }}>{c}</Link>)}</div></section>
      <section><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}><h2 className="page-title" style={{ marginBottom: 0 }}>Популярные товары</h2><Link to="/catalog" style={{ color: 'var(--primary)', fontWeight: 600 }}>Все →</Link></div>{loading ? <SkeletonGrid /> : <div className="product-grid">{products.map(p => <ProductCard key={p.id} product={p} />)}</div>}</section>
    </div>
  )
}
