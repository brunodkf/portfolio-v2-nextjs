import React from 'react'
import ListaDeHabilidades from './ListaDeHabilidades'

const Footer = () => {
    return (
        <footer className="w-screen h-[50px] absolute bottom-0 ">
            <div className="container m-auto flex items-center justify-between">
                <h1 className="text-branco">Memento Mori | Memento Vivere</h1>

                <ListaDeHabilidades />
            </div>
        </footer>
    )
}

export default Footer