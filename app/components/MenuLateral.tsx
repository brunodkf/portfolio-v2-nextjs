'use client'

import React from 'react'
import ListaRouters from './ListaRouters';


const MenuLateral = () => {
  return (
    <aside 
    // className="hidden w-28 lg:flex flex-col justify-center items-center fixed h-full  text-white z-50"
    className='hidden w-auto h-1/4 fixed translate-y-[150%] my-auto z-50 text-white lg:flex flex-col justify-center items-center'
    >
      <ListaRouters />
    </aside>
  )
}

export default MenuLateral
