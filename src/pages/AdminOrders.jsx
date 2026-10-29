import React from 'react'
import { useEffect, useState } from 'react'
import { ordersApi } from '../api/api'
import { formatPrice, formatDate } from '../utils/format'
import Loader from '../components/Loader'
export default function AdminOrders() {
  const [orders, setOrders] = useState([]); const [loading, setLoading] = useState(true)
  useEffect(() => { ordersApi.getAll().then(data => setOrders(data.carts || [])).finally(() => setLoading(false)) }, [])
  return (
    <div className="page">
      <h1 className="page-title">Админ-панель: заказы</h1>
      {loading ? <Loader /> : <div className="table-wrap"><table><thead><tr><th>№</th><th>Клиент</th><th>Товаров</th><th>Сумма</th><th>Дата</th></tr></thead><tbody>{orders.map(o => <tr key={o.id}><td>#{o.id}</td><td>Клиент #{o.userId}</td><td>{o.totalProducts}</td><td>{formatPrice(o.total)}</td><td>{formatDate(new Date())}</td></tr>)}</tbody></table></div>}
    </div>
  )
}
