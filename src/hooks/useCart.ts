'use client'

import { useEffect, useState } from 'react'

export function useCart() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) setCart(JSON.parse(stored))
  }, [])

  const saveCart = (items: any[]) => {
    setCart(items)
    localStorage.setItem('cart', JSON.stringify(items))
  }

  const addToCart = (item: any) => {
    const updated = [...cart, item]
    saveCart(updated)
  }

  const clearCart = () => saveCart([])

  return { cart, addToCart, clearCart }
}
