import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
export default function ProductCard({ product }) {
  const { addItem } = useCart()
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__img"><img src={product.thumbnail} alt={product.title} loading="lazy" /></Link>
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="product-card__title">{product.title}</Link>
        <span className="rating">★ {product.rating?.toFixed(1) ?? '—'}</span>
        <div className="product-card__footer">
          <span className="price">{formatPrice(product.price)}</span>
          <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 13 }} onClick={() => addItem(product)}>В корзину</button>
        </div>
      </div>
    </article>
  )
}
