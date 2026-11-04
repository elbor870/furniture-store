import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productsApi } from '../api/api'
import ProductCard from '../components/ProductCard'
import { SkeletonGrid } from '../components/Loader'

const categories = [
  { name: 'Гостиная', note: 'Место для встреч', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85' },
  { name: 'Спальня', note: 'Ваше личное пространство', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85' },
  { name: 'Столовая', note: 'Собираться вместе', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { name: 'Освещение', note: 'Атмосфера в деталях', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85' },
]
export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { let active = true; productsApi.getFeatured().then(items => { if (active) setProducts(items) }).finally(() => { if (active) setLoading(false) }); return () => { active = false } }, [])
  return <div className="home-page">
    <section className="hero container"><div className="hero-image" /><div className="hero-content">
      <span className="eyebrow"><span /> Коллекция 2026 · FORMA HOME</span>
      <h1>Пространство,<br /><em>в котором</em> живут.</h1>
      <p>Мебель и предметы интерьера, в которых встречаются природные материалы, чистые формы и ощущение дома.</p>
      <div className="hero-actions"><Link to="/catalog" className="btn btn-primary">Открыть коллекцию <span>↗</span></Link><span className="hero-caption">Дизайн вне времени. Комфорт каждый день.</span></div>
    </div><div className="hero-index">01 <i /> 04</div></section>
    <section className="container section-block"><div className="section-heading"><div><span className="eyebrow dark">Подберите настроение</span><h2>Комнаты и <em>истории</em></h2></div><p>Каждое пространство начинается с деталей. Найдите то, что подходит именно вашему дому.</p></div>
      <div className="category-grid">{categories.map((item,index)=><Link to={'/catalog?category='+encodeURIComponent(item.name)} className="category-tile" key={item.name}><img src={item.image} alt={item.name} loading="lazy" /><span className="category-number">0{index+1}</span><span className="category-copy"><strong>{item.name}</strong><small>{item.note}</small></span><span className="category-arrow">↗</span></Link>)}</div>
    </section>
    <section className="container section-block featured-block"><div className="section-heading"><div><span className="eyebrow dark">Выбор FORMA</span><h2>Предметы <em>с характером</em></h2></div><Link to="/catalog" className="text-link">Весь каталог <span>↗</span></Link></div>
      {loading ? <SkeletonGrid /> : <div className="product-grid">{products.map(product=><ProductCard key={product.id} product={product} />)}</div>}
    </section>
    <section className="container story-panel"><div className="story-photo"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90" alt="Современная гостиная в натуральных оттенках" loading="lazy" /></div><div className="story-copy"><span className="eyebrow dark">Философия FORMA</span><h2>Меньше вещей.<br /><em>Больше смысла.</em></h2><p>Мы выбираем предметы, которые не спорят с пространством, а раскрывают его. Честные материалы, тактильные поверхности и дизайн, который остаётся актуальным.</p><Link to="/catalog" className="text-link">Найти свою форму <span>↗</span></Link></div></section>
    <section className="container service-strip"><div><span>01</span><strong>Продуманный выбор</strong><small>Предметы для жизни, а не витрины</small></div><div><span>02</span><strong>Доставка по России</strong><small>Бережно и в удобное время</small></div><div><span>03</span><strong>Поддержка проекта</strong><small>Помогаем собрать цельный интерьер</small></div></section>
  </div>
}
