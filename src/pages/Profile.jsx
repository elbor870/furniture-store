import React, { useEffect, useState } from 'react'
import { ordersApi } from '../api/api'
import { useAuth } from '../context/AuthContext'
import { formatPrice, formatDate } from '../utils/format'
import Loader from '../components/Loader'

export default function Profile() {
  const { user, logout } = useAuth(); 
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true)
  
  useEffect(() => { 
    console.log("=== ПРОВЕРКА ЗАКАЗОВ ===");
    
    // Достаем локальные заказы
    const localOrders = JSON.parse(localStorage.getItem('my_orders') || '[]')
    console.log("Локальные заказы в браузере:", localOrders);

    // Запрашиваем с сервера
    ordersApi.getByUser(user.id)
      .then(data => {
        console.log("Заказы с сервера DummyJSON:", data.carts);
        const serverOrders = data.carts || []
        
        // Объединяем
        const allOrders = [...localOrders, ...serverOrders];
        console.log("Итоговый список для таблицы:", allOrders);
        setOrders(allOrders)
      })
      .catch((err) => {
        console.error("Ошибка сервера, показываем только локальные:", err);
        setOrders(localOrders)
      })
      .finally(() => setLoading(false)) 
  }, [user.id])

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Личный кабинет</h1>
          <p className="page-subtitle">{user.firstName} {user.lastName} (ID: {user.id})</p>
        </div>
        <button className="btn btn-danger" onClick={logout}>Выйти</button>
      </div>
      
      <h2 style={{ fontSize: 22, marginBottom: 16 }}>Мои заказы</h2>
      
      {loading ? <Loader /> : orders.length === 0 ? (
        <div className="empty-state"><h2>Заказов нет</h2></div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>№</th><th>Дата</th><th>Товаров</th><th>Сумма</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.date ? formatDate(o.date) : formatDate(new Date())}</td>
                  <td>{o.totalProducts || o.products?.length || 0}</td>
                  <td>{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
