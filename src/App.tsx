import './App.css'
import Hero from './components/Hero.tsx'
import Background from './components/Background.tsx'
import Projects from './components/Projects.tsx'
import TopBar from './components/TopBar.tsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from './contexts/I18nContext.tsx'

function App() {
  const { locale } = useI18n()
  return (
    <div className="app">
      <TopBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={locale}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Hero />
          <Background />
          <Projects />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
