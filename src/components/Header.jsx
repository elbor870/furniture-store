import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
export default function Header() {
 const { totalCount } = useCart(); const { user, logout, isAdmin } = useAuth(); const [open, setOpen] = useState(false); const navigate = useNavigate()
 const close = () => setOpen(false)
 const handleLogout = () => { logout(); close(); navigate('/') }
 return <><div className="announcement"><span>FORMA JOURNAL</span><p>Предметы для жизни. Дизайн вне времени.</p><span>Доставка по всей России</span></div><header className="header"><div className="container header-inner"><button className="menu-trigger" onClick={() => setOpen(v => !v)}>☰</button><Link to="/" className="logo">FORMA<span>HOME</span></Link><nav className="nav-links"><NavLink to="/">Главная</NavLink><NavLink to="/catalog">Каталог</NavLink><NavLink to="/catalog?category=Гостиная">Гостиная</NavLink><NavLink to="/catalog?category=Спальня">Спальня</NavLink>{isAdmin && <NavLink to="/admin/products">Управление</NavLink>}</nav><div className="header-actions"><Link to={user ? '/profile' : '/login'} className="account-link">{user ? 'Кабинет' : 'Войти'}</Link><Link to="/cart" className="cart-link"><span>Корзина</span><b>{totalCount}</b></Link></div></div><nav className={'mobile-menu ' + (open ? 'open' : '')}><NavLink to="/" onClick={close}>Главная</NavLink><NavLink to="/catalog" onClick={close}>Каталог</NavLink><NavLink to="/profile" onClick={close}>Личный кабинет</NavLink>{isAdmin && <NavLink to="/admin/products" onClick={close}>Админ-панель</NavLink>}{user ? <button onClick={handleLogout}>Выйти</button> : <NavLink to="/login" onClick={close}>Войти</NavLink>}</nav></header></>
}
