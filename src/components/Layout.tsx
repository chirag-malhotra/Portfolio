import React, { useState } from 'react'
import Navigation from './Navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import InteractiveTerminal from './InteractiveTerminal'
import './Layout.scss'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.mode)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  return (
    <div className={`layout theme-${theme}`}>
      {/* Ambient background glows */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      
      <Navigation onOpenTerminal={() => setIsTerminalOpen(true)} />
      
      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>© 2024 Chirag Malhotra. All rights reserved.</p>
      </footer>

      {/* Floating Action Button for Terminal */}
      <button 
        className="terminal-fab" 
        onClick={() => setIsTerminalOpen(true)}
        aria-label="Open CLI terminal"
        title="Open interactive terminal console"
      >
        ⌨️
      </button>

      {/* Interactive terminal overlay */}
      <InteractiveTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </div>
  )
}

export default Layout
