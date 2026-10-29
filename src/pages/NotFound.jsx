import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound() { return <div className="page empty-state"><h1 style={{ fontSize: 96, color: 'var(--primary)' }}>404</h1><h2>Страница не найдена</h2><Link to="/" className="btn btn-primary" style={{ marginTop: 24 }}>На главную</Link></div> }
