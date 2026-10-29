import React from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const CartContext = createContext(null)
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => { try { return JSON.parse(localStorage.getItem('cart')) || [] } catch { return [] } })
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)) }, [items])
  const addItem = (product, quantity = 1) => setItems(prev => {
    const existing = prev.find(i => i.id === product.id)
    if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
    return [...prev, { id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, quantity }]
  })
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const updateQuantity = (id, quantity) => { if (quantity <= 0) return removeItem(id); setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i)) }
  const clearCart = () => setItems([])
  const totalCount = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items])
  return <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice }}>{children}</CartContext.Provider>
}
export const useCart = () => useContext(CartContext)
