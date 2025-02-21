'use client'

import React from 'react'
import ListaRouters from './ListaRouters';


const MenuLateral = () => {
  return (
    <aside className="hidden w-28 lg:flex flex-col justify-center items-center fixed h-full text-white z-50
     ">
      <ListaRouters />
    </aside>
  )
}

export default MenuLateral
