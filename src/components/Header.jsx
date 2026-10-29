import React from 'react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
export default function Header() {
  const { totalCount } = useCart(); const { user, logout, isAdmin } = useAuth(); const [open, setOpen] = useState(false); const navigate = useNavigate()
  const handleLogout = () => { logout(); setOpen(false); navigate('/') }
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">Мебель<span>&</span>Интерьер</Link>
        <nav className="nav-links">
          <NavLink to="/">Главная</NavLink><NavLink to="/catalog">Каталог</NavLink>
          {isAdmin && <NavLink to="/admin/products">Админ-панель</NavLink>}
          {user && <NavLink to="/profile">Личный кабинет</NavLink>}
        </nav>
        <div className="header-actions">
          {user ? <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '8px 16px' }}>Выйти</button> : <Link to="/login" className="btn btn-outline" style={{ padding: '8px 16px' }}>Войти</Link>}
          <Link to="/cart" className="icon-btn">🛒{totalCount > 0 && <span className="cart-badge">{totalCount}</span>}</Link>
          <button className="icon-btn burger" onClick={() => setOpen(v => !v)}>☰</button>
        </div>
      </div>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <NavLink to="/" onClick={() => setOpen(false)}>Главная</NavLink><NavLink to="/catalog" onClick={() => setOpen(false)}>Каталог</NavLink>
        {isAdmin && <NavLink to="/admin/products" onClick={() => setOpen(false)}>Админ-панель</NavLink>}
        {user && <NavLink to="/profile" onClick={() => setOpen(false)}>Личный кабинет</NavLink>}
        {user ? <button onClick={handleLogout} style={{ textAlign: 'left', fontWeight: 500 }}>Выйти</button> : <NavLink to="/login" onClick={() => setOpen(false)}>Войти</NavLink>}
      </div>
    </header>
  )
}
