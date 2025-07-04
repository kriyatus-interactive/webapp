import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-b-foreground/10 py-3 px-6">
          <div className="flex items-center gap-2">
              <div className='bg-black dark:bg-white w-8 h-8 rounded-full border border-gray-700 text-transparent'>k</div>
              <Link href={"/"} className='font-semibold text-lg capitalize'>Kriyatus</Link>
          </div>
          <div className='flex items-center gap-4'>
            <Link href={"/"} className='text-base capitalize hover:text-gray-500 transition-all ease-in-out duration-200'>About</Link>
            <Link href={"/"} className='text-base capitalize hover:text-gray-500 transition-all ease-in-out duration-200'>Help</Link>
          </div>
    </nav>
  )
}

export default Navbar