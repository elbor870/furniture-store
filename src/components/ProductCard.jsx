import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
export default function ProductCard({ product }) {
 const { addItem } = useCart()
 return <article className="product-card"><Link to={'/product/' + product.id} className="product-card__img"><img src={product.thumbnail} alt={product.title} loading="lazy" /></Link><div className="product-card__body"><div className="product-card__meta"><span>{product.category}</span><span className="rating">★ {product.rating}</span></div><Link to={'/product/' + product.id} className="product-card__title">{product.title}</Link><div className="product-card__footer"><span className="price">{formatPrice(product.price)}</span><button className="quick-add" onClick={() => addItem(product)}>+</button></div></div></article>
}
