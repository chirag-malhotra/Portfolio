import React, { useState, useEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18nContext'
import './InteractiveTerminal.scss'

interface CommandLog {
  text: string
  type: 'input' | 'output' | 'error' | 'success'
}

interface InteractiveTerminalProps {
  isOpen: boolean
  onClose: () => void
}

const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const { t, tRaw } = useI18n()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandLog[]>([
    { text: 'Chirag OS v1.0.0 (Type "help" for a list of commands)', type: 'success' },
  ])
  const [isMatrixActive, setIsMatrixActive] = useState(false)
  
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Matrix Rain Animation Effect
  useEffect(() => {
    if (!isMatrixActive || !isOpen) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight

    const columns = Math.floor(canvas.width / 20)
    const ypos = Array(columns).fill(0)

    const matrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f0'
      ctx.font = '15pt monospace'

      ypos.forEach((y, index) => {
        const text = String.fromCharCode(Math.random() * 128)
        const x = index * 20
        ctx.fillText(text, x, y)

        if (y > 100 + Math.random() * 10000) {
          ypos[index] = 0
        } else {
          ypos[index] = y + 20
        }
      })
    }

    const interval = setInterval(matrix, 50)

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMatrixActive, isOpen])

  if (!isOpen) return null

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase()
    const parts = trimmed.split(' ')
    const cmd = parts[0]
    
    const newLogs: CommandLog[] = [
      ...history,
      { text: `$ ${cmdStr}`, type: 'input' }
    ]

    switch (cmd) {
      case 'help':
        newLogs.push({
          text: 'Available Commands:\n' +
                '  about       - Display summary/about me details\n' +
                '  skills      - Show technical skills summary\n' +
                '  experience  - View work history and milestones\n' +
                '  matrix      - Start/Stop Matrix code rain effect\n' +
                '  clear       - Clear terminal history\n' +
                '  exit        - Close the interactive console',
          type: 'output'
        })
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      case 'exit':
        onClose()
        setInput('')
        return
      case 'about':
        newLogs.push({ text: t('summary.content'), type: 'output' })
        break
      case 'skills':
        const skillsText = `Technical Skills Summary:\n` +
          `• Core Frontend: ${t('skills.items.frontend')}\n` +
          `• Frameworks:    ${t('skills.items.frameworks')}\n` +
          `• Testing:       ${t('skills.items.testing')}\n` +
          `• Collaboration: ${t('skills.items.collaboration')}\n` +
          `• Backend/DB:    ${t('skills.items.backend')}`
        newLogs.push({ text: skillsText, type: 'output' })
        break
      case 'experience':
        const jobs = tRaw('experience.jobs') || []
        let jobOutput = 'Work History:\n'
        jobs.forEach((job: any) => {
          jobOutput += `\n[${job.company}] - ${job.position} (${job.duration})\n`
          job.highlights.forEach((hl: string) => {
            jobOutput += `  * ${hl}\n`
          })
        })
        newLogs.push({ text: jobOutput, type: 'output' })
        break
      case 'matrix':
        setIsMatrixActive(!isMatrixActive)
        newLogs.push({
          text: isMatrixActive ? 'Matrix code rain deactivated.' : 'Matrix code rain activated! Press terminal window or type "matrix" to stop.',
          type: 'success'
        })
        break
      case '':
        break
      default:
        newLogs.push({ text: `Command not found: "${cmd}". Type "help" for a list of available commands.`, type: 'error' })
    }

    setHistory(newLogs)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    }
  }

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
        {isMatrixActive && <canvas ref={canvasRef} className="matrix-canvas" onClick={() => setIsMatrixActive(false)} />}
        
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" onClick={onClose}></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">chirag@portfolio: ~</span>
        </div>

        <div className="terminal-body" ref={terminalRef}>
          {history.map((log, index) => (
            <pre key={index} className={`log-line ${log.type}`}>
              {log.text}
            </pre>
          ))}
          
          <div className="terminal-input-line">
            <span className="prompt">$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveTerminal
