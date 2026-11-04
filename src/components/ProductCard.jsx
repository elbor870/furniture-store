import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
export default function ProductCard({ product }) {
 const { addItem } = useCart()
 return <article className="product-card"><Link to={'/product/' + product.id} className="product-card__img"><img src={product.thumbnail} alt={product.title} loading="lazy" /><span className="product-image-label">FORMA / OBJECT</span><span className="product-view">Смотреть <b>↗</b></span></Link><div className="product-card__body"><div className="product-card__meta"><span>{product.category}</span><span className="rating">★ {Number(product.rating || 0).toFixed(1)}</span></div><Link to={'/product/' + product.id} className="product-card__title">{product.title}</Link><div className="product-card__footer"><span className="price">{formatPrice(product.price)}</span><button className="quick-add" aria-label={'Добавить ' + product.title + ' в корзину'} onClick={() => addItem(product)}>+</button></div></div></article>
}
