import React from 'react'
import AppNavbar from './AppNavbar'

function AppLayout({children}) {
    return (
        <div>
            <AppNavbar/>
            <main>
                {children}
            </main>
        </div>
    )
}

export default AppLayout
