import { motion } from 'framer-motion'
import { Code2, Sparkles, Github, Mail, Linkedin } from 'lucide-react'
import './Hero.css'
import { useI18n } from '../contexts/I18nContext.tsx'
import TypingText from './TypingText.tsx'
import React, { useState } from 'react'

const Hero = () => {
  const { t } = useI18n()
  const skills = ['React', 'JavaScript', 'TypeScript', 'Python', 'C/C++', 'SQL']

  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-header"
        >
          <motion.div
            className="sparkle-icon"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={40} />
          </motion.div>
          <h1>
            {t('hero_hi')} <span className="wave">👋</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="intro"
        >
          <h2>
            {t('hero_im')}{' '}
            { (document.documentElement.getAttribute('lang') ?? 'ja') === 'ja' ? (
              <JapaneseNameTyping />
            ) : (
              <TypingText
                text={'Fuka Nagata'}
                speed={130}
                startDelay={250}
                className="name"
                ariaLabel="name typing"
              />
            )}
          </h2>
          <div className="role">
            <Code2 size={24} />
            <span>{t('hero_role')}</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="description"
        >
          {t('hero_desc_1')}
          <br />
          {t('hero_desc_2')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="skills"
        >
          <h3>{t('hero_skills')}</h3>
          <div className="skill-tags">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="skill-tag"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="social-links"
        >
          <motion.a
            href="https://github.com/fleur0121"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            href="mailto:fuka.nagata0121@gmail.com"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mail size={24} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/fukanagata"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin size={24} />
          </motion.a>
        </motion.div>
      </div>

      <div className="floating-shapes">
        <motion.div
          className="shape shape-1"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="shape shape-2"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="shape shape-3"
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  )
}

export default Hero

// Compose a Japanese IME-like typing: surname (romaji→かな→漢字) then given name
const JapaneseNameTyping: React.FC = () => {
  type Phase = 'romaji_last' | 'kana_last' | 'kanji_last' | 'romaji_first' | 'kana_first' | 'kanji_first'
  const [phase, setPhase] = useState<Phase>('romaji_last')

  return (
    <span className="name" aria-label="name typing ja">
      {/* Surname: 永田 */}
      {phase === 'romaji_last' && (
        <span className="ime-convert">
          <TypingText
            text={'nagata'}
            speed={(ch) => (/[aiueoAIUEO]/.test(ch) ? 85 : 105)}
            startDelay={240}
            spacePause={120}
            punctuationPause={120}
            jitter={30}
            ariaLabel="romaji surname"
            onDone={() => setPhase('kana_last')}
          />
        </span>
      )}
      {phase === 'kana_last' && (
        <span className="ime-convert ime-kana">
          ながた
          <TypingText text={''} startDelay={420} cursor={false} onDone={() => setPhase('kanji_last')} />
        </span>
      )}
      {['kanji_last', 'romaji_first', 'kana_first', 'kanji_first'].includes(phase) && (
        <span className="ime-convert" style={{ marginRight: 6 }}>永田</span>
      )}

  {/* space between surname and given name */}
  {['kanji_last', 'romaji_first', 'kana_first', 'kanji_first'].includes(phase) && <span>&nbsp;</span>}

      {/* Given name: 風花 */}
      {phase === 'kanji_last' && (
        <span className="ime-convert">
          <TypingText
            text={'fuuka'}
            speed={(_ch, i) => (i === 1 ? 140 : 100)}
            startDelay={120}
            jitter={25}
            ariaLabel="romaji given"
            onDone={() => setPhase('kana_first')}
          />
        </span>
      )}
      {phase === 'kana_first' && (
        <span className="ime-convert ime-kana">
          ふうか
          <TypingText text={''} startDelay={380} cursor={false} onDone={() => setPhase('kanji_first')} />
        </span>
      )}
  {phase === 'kanji_first' && <span className="ime-convert">風花</span>}
    </span>
  )
}
