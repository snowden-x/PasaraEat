'use client'

import React from 'react'
import Header from './Header'
import Search from './Search'
import NavMenu from './NavMenu'
import MenuContainer from './MenuContainer'
import { MenuProvider } from './MenuProvider'

export default function UserInterface() {
    return (
        <MenuProvider>
            <Header />
            <Search />
            <NavMenu />
            <MenuContainer />
        </MenuProvider>
    )
}