import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productsApi } from '../api/api'
import ProductCard from '../components/ProductCard'
import { SkeletonGrid } from '../components/Loader'
const categories = [
  { name: 'Гостиная', note: 'Место для встреч', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=88', number: '01' },
  { name: 'Спальня', note: 'Ваше личное пространство', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=88', number: '02' },
  { name: 'Столовая', note: 'Собираться вместе', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=88', number: '03' },
  { name: 'Освещение', note: 'Атмосфера в деталях', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1100&q=88', number: '04' },
]
export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { let active = true; productsApi.getFeatured().then(items => { if (active) setProducts(items) }).finally(() => { if (active) setLoading(false) }); return () => { active = false } }, [])
  return <div className="home-page">
    <section className="hero container"><div className="hero-image" /><div className="hero-topline"><span>Коллекция / 2026</span><span>01 — 04</span></div><div className="hero-content">
      <span className="eyebrow"><span /> FORMA HOME · ИСКУССТВО ЖИТЬ</span><h1>Дом — это<br /><em>чувство.</em></h1>
      <p>Предметы, которые создают настроение. Чистые линии, выразительные фактуры и красота, в которой удобно жить.</p>
      <div className="hero-actions"><Link to="/catalog" className="btn btn-primary">Исследовать коллекцию <span>↗</span></Link><span className="hero-caption">Интерьер начинается с вас</span></div>
    </div><div className="hero-side-note">FORM FOLLOWS FEELING <i /></div><div className="hero-index"><span>SCROLL TO EXPLORE</span><i /></div></section>
    <section className="container intro-line"><span>01 / НАШ ПОДХОД</span><p>Мы верим, что <em>хороший дизайн</em> — не про лишнее. Он про ощущение, которое остаётся с вами каждый день.</p><span className="intro-mark">F.</span></section>
    <section className="container section-block category-section"><div className="section-heading"><div><span className="eyebrow dark">Найдите своё пространство</span><h2>Комнаты, в которых<br /><em>есть жизнь.</em></h2></div><p>От первого утреннего света до долгих вечерних разговоров — соберите интерьер под свой ритм.</p></div>
      <div className="category-grid">{categories.map(item=><Link to={'/catalog?category='+encodeURIComponent(item.name)} className="category-tile" key={item.name}><img src={item.image} alt={item.name} loading="lazy" /><span className="category-number">{item.number} / 04</span><span className="category-copy"><strong>{item.name}</strong><small>{item.note}</small></span><span className="category-arrow">↗</span></Link>)}</div>
    </section>
    <section className="featured-wrap"><div className="container featured-block"><div className="section-heading"><div><span className="eyebrow dark">Отобрано с вниманием</span><h2>Вещи, которые<br /><em>остаются.</em></h2></div><Link to="/catalog" className="text-link">Смотреть все предметы <span>↗</span></Link></div>
      {loading ? <SkeletonGrid /> : <div className="product-grid">{products.map(product=><ProductCard key={product.id} product={product} />)}</div>}</div></section>
    <section className="container story-panel"><div className="story-photo"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=92" alt="Светлая гостиная с натуральными материалами" loading="lazy" /><span className="photo-stamp">FORMA<br />JOURNAL<br /><b>№ 01</b></span></div><div className="story-copy"><span className="eyebrow dark">Философия FORMA</span><h2>Меньше вещей.<br /><em>Больше жизни.</em></h2><p>Мы выбираем предметы, которые не спорят с пространством, а раскрывают его. Честные материалы, тактильные поверхности и дизайн, который становится частью вашей истории.</p><Link to="/catalog" className="text-link">Найти свою форму <span>↗</span></Link><div className="story-signature">FORMA HOME <span>— пространство для настоящего</span></div></div></section>
    <section className="container service-strip"><div><span>01</span><strong>Вещи со смыслом</strong><small>Продуманный выбор для повседневной жизни</small></div><div><span>02</span><strong>Забота о деталях</strong><small>Бережная доставка и внимание к каждому заказу</small></div><div><span>03</span><strong>Ваш личный стиль</strong><small>Помогаем собрать цельный интерьер</small></div></section>
    <section className="closing-banner"><div className="container closing-inner"><span className="eyebrow">ВАШ ДОМ. ВАША ФОРМА.</span><h2>Пусть пространство<br /><em>говорит о вас.</em></h2><Link to="/catalog" className="btn btn-light">Выбрать предметы <span>↗</span></Link></div></section>
  </div>
}
