'use client'

import React from 'react'
import ListaRouters from './ListaRouters';


const MenuLateral = () => {
  return (
    <aside 
    className='hidden w-auto h-1/4 absolute translate-y-[150%] my-auto z-50 text-cinza dark:text-white lg:flex flex-col justify-center items-center'
    >
      <ListaRouters />
    </aside>
  )
}

export default MenuLateral
