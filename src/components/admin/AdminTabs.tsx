'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Utensils, ClipboardList, MessageSquare } from 'lucide-react'

const tabs = [
  { href: '/admin', icon: LayoutDashboard },
  { href: '/admin/menu', icon: Utensils },
  { href: '/admin/orders', icon: ClipboardList },
  { href: '/admin/reviews', icon: MessageSquare },
]

export default function AdminTabs() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
      <div className="bg-white shadow-xl rounded-full px-6 py-3 flex gap-8">
        {tabs.map(tab => {
          const Icon = tab.icon
          const active = pathname === tab.href

          return (
            <Link key={tab.href} href={tab.href}>
              <Icon
                size={22}
                className={active ? 'text-[#C62828]' : 'text-gray-400'}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

