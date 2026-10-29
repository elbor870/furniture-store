export const formatPrice = (value) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value)
export const formatDate = (iso) => new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })
export const STATUS_LABELS = { pending: 'В обработке', processing: 'Собирается', shipped: 'Отправлен', delivered: 'Доставлен', cancelled: 'Отменён' }
