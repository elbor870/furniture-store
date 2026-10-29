import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Register() {
  const { register } = useAuth(); const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '', firstName: '', lastName: '', email: '' }); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => { e.preventDefault(); setLoading(true); setError(''); try { await register(form); navigate('/') } catch (err) { setError('Ошибка') } finally { setLoading(false) } }
  return (
    <div className="page"><div className="form-card">
      <h1>Регистрация</h1>{error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}><div className="form-group"><label>Имя</label><input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required /></div><div className="form-group"><label>Фамилия</label><input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required /></div><div className="form-group"><label>Логин</label><input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required /></div><div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div><div className="form-group"><label>Пароль</label><input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></div><button className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>{loading ? '...' : 'Зарегистрироваться'}</button></form>
      <div className="form-footer">Уже есть аккаунт? <Link to="/login">Войти</Link></div>
    </div></div>
  )
}
