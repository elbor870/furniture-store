import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { productsApi } from '../api/api'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import Loader from '../components/Loader'
export default function ProductDetail() {
  const { id } = useParams(); const { addItem } = useCart(); const [product, setProduct] = useState(null); const [quantity, setQuantity] = useState(1); const [loading, setLoading] = useState(true)
  useEffect(() => { setLoading(true); productsApi.getById(id).then(setProduct).finally(() => setLoading(false)) }, [id])
  if (loading) return <div className="page"><Loader /></div>
  if (!product) return <div className="page empty-state"><h2>Товар не найден</h2><Link to="/catalog" className="btn btn-primary">В каталог</Link></div>
  return (
    <div className="page">
      <div className="product-detail">
        <div className="product-gallery"><img src={product.thumbnail} alt={product.title} /></div>
        <div className="product-info">
          <span className="product-card__category">{product.category}</span><h1>{product.title}</h1>
          <div className="rating">★ {product.rating?.toFixed(1)} · {product.stock} шт.</div><div className="price">{formatPrice(product.price)}</div><p className="product-desc">{product.description}</p>
          <div className="quantity"><button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button><span>{quantity}</span><button onClick={() => setQuantity(q => q + 1)}>+</button></div>
          <div className="product-actions"><button className="btn btn-primary" onClick={() => addItem(product, quantity)}>Добавить в корзину</button><Link to="/cart" className="btn btn-outline">В корзину</Link></div>
        </div>
      </div>
    </div>
  )
}
