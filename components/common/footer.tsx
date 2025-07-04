import React from 'react'
import { ThemeSwitcher } from '@/components/theme-switcher'

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto py-4">
      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-500">
          © {new Date().getFullYear()} Kriyatus. All rights reserved.
        </span>
        <ThemeSwitcher />
      </div>
    </footer>
  )
}

export default Footer
