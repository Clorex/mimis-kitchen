'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

export default function FloatingCart() {
  const { cart } = useCart()

  return (
    <Link href="/checkout">
      <div className="fixed top-6 right-6 bg-[#C62828] text-white p-3 rounded-full shadow-xl z-50">
        <ShoppingBag size={20} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-2">
            {cart.length}
          </span>
        )}
      </div>
    </Link>
  )
}

