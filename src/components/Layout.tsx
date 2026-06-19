import React from 'react'
import Navigation from './Navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import './Layout.scss'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.mode)

  return (
    <div className={`layout theme-${theme}`}>
      <Navigation />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>© 2024 Chirag Malhotra. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout
