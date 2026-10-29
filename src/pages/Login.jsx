import React from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Login() {
  const { login } = useAuth(); const navigate = useNavigate(); const location = useLocation(); const from = location.state?.from?.pathname || '/'
  const [form, setForm] = useState({ username: '', password: '' }); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault(); if (!form.username || !form.password) return setError('Заполните поля'); setLoading(true); setError('')
    try { await login(form.username, form.password); navigate(from, { replace: true }) } catch (err) { setError('Неверный логин или пароль') } finally { setLoading(false) }
  }
  return (
    <div className="page"><div className="form-card">
      <h1>Вход</h1>{error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}><div className="form-group"><label>Логин</label><input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} /></div><div className="form-group"><label>Пароль</label><input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div><button className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>{loading ? 'Входим...' : 'Войти'}</button></form>
      <div className="alert alert-info" style={{ marginTop: 20, fontSize: 13 }}>Для теста: <b>emilys</b> / <b>emilyspass</b></div>
      <div className="form-footer">Нет аккаунта? <Link to="/register">Регистрация</Link></div>
    </div></div>
  )
}
