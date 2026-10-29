import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart()
  if (items.length === 0) return <div className="page empty-state"><h2>Корзина пуста</h2><Link to="/catalog" className="btn btn-primary">В каталог</Link></div>
  return (
    <div className="page">
      <h1 className="page-title">Корзина</h1>
      <div className="cart-layout">
        <div>
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} />
              <div><Link to={`/product/${item.id}`} className="cart-item__title">{item.title}</Link><div className="cart-item__price">{formatPrice(item.price)} за шт.</div><div className="quantity" style={{ marginTop: 8 }}><button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button></div></div>
              <div style={{ textAlign: 'right' }}><div className="price">{formatPrice(item.price * item.quantity)}</div><button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: 12, marginTop: 8 }} onClick={() => removeItem(item.id)}>Удалить</button></div>
            </div>
          ))}
          <button className="btn btn-outline" onClick={clearCart}>Очистить корзину</button>
        </div>
        <aside className="cart-summary">
          <h3>Итого</h3><div className="summary-row"><span>Товаров</span><span>{items.reduce((s, i) => s + i.quantity, 0)} шт.</span></div><div className="summary-row total"><span>К оплате</span><span>{formatPrice(totalPrice)}</span></div>
          <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: 20 }}>Оформить заказ</Link>
        </aside>
      </div>
    </div>
  )
}
