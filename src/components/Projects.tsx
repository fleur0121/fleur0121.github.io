import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import './Projects.css'
import { useI18n } from '../contexts/I18nContext.tsx'

interface Project {
  id: number
  title: string
  description_en: string
  description_ja: string
  tags: string[]
  image: string
  github?: string
  demo?: string
  color: string
}

const Projects = () => {
  const { t, locale } = useI18n()
  const projects: Project[] = [
    {
      id: 1,
      title: 'FlexyCook',
      description_ja: 'レシピ検索や買い物リストを統合したWebアプリ。 要件定義から設計・開発・テスト・デプロイまでをアジャイルで実施し、UI/UXとアクセシビリティを重視。',
      description_en: 'A web app that combines recipe search and shopping lists. Implemented end-to-end from requirements, design, development, testing to deployment in an agile style, with a focus on UI/UX and accessibility.',
      tags: ['React', 'CSS Modules', 'React Router', 'Vitest', 'Vite', 'AWS'],
      image: '🥕',
      github: 'https://github.com/fleur0121/flexy-cook',
      demo: 'https://d3djat1rz51o8y.cloudfront.net/',
      color: '#FFB6C1'
    },
    {
      id: 2,
      title: 'FexyCook API',
      description_ja: '外部APIとの通信を仲介する軽量サーバー。',
      description_en: 'A lightweight server that brokers communication with external APIs.',
      tags: ['Node.js', 'Express', 'Axios', 'morgan', 'REST API'],
      image: '💬',
      github: 'https://github.com/fleur0121/flexy-cook-api/tree/main',
      color: '#DDA0DD'
    },
    {
      id: 3,
      title: 'Pr0nuc!ate',
      description_ja: 'AI音声認識で発話を解析し、会話型チャットボットとゲーム練習・進捗可視化を提供するスピーチセラピーWebアプリ。Cmd-f 2025にて 準優勝 / Best Use of Cloudflare AI賞 受賞。',
      description_en: 'A speech-therapy web app that analyzes speech with AI speech recognition and provides a conversational chatbot, game-like practice, and progress visualization. Winner: Cmd-f 2025 Runner-up / Best Use of Cloudflare AI.',
      tags: ['React', 'CSS', 'Node.js', 'MongoDB', 'Vite', 'Vercel'],
      image: '📣',
      github: 'https://github.com/fleur0121/Pr0nuciate',
      demo: 'https://cmdf2025-pron.vercel.app/',
      color: '#87CEEB'
    },
    {
      id: 4,
      title: 'SenseBank',
      description_ja: '行動選択型ミニゲームから性格スナップを生成し、MBTI/性格診断を提示するWebアプリ。',
      description_en: 'A web app that generates a personality snapshot from a choice-driven mini game and presents MBTI/personality insights.',
      tags: ['Unity', 'C#', 'React', 'TypeScript', 'JavaScript', 'Vite', 'Vercel'],
      image: '🎮',
      github: 'https://github.com/fleur0121/SenseBank',
      demo: 'https://devpost.com/software/sencebank',
      color: '#98FB98'
    },
    {
      id: 5,
      title: 'SimpleShell',
      description_ja: 'Cで実装したミニマルなUNIXシェル。プロセス制御と低レイヤOSの理解を目的に作成。',
      description_en: 'A minimal UNIX shell written in C.  Built to deepen understanding of process control and low-level OS concepts.',
      tags: ['C', 'CMake'],
      image: '🐚',
      github: 'https://github.com/fleur0121/SimpleShell',
      color: '#FFD54F'
    },
    {
      id: 6,
      title: 'Yahtzee',
      description_ja: 'Javaで作成したYahtzeeのコマンドライン版。',
      description_en: 'A simple command-line Yahtzee written in Java.',
      tags: ['Java'],
      image: '🎲',
      github: 'https://github.com/fleur0121/Yahtzee',
      color: '#B0E0E6'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="projects-header"
      >
        <h2>
          <span className="emoji">💼</span> {t('projects_title')}
        </h2>
        <p>{t('projects_caption')}</p>
      </motion.div>

      <motion.div
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="project-card"
            variants={cardVariants}
            whileHover={{ y: -10 }}
            style={{ '--card-color': project.color } as React.CSSProperties}
          >
            <div className="project-image" style={{ background: project.color }}>
              <span className="project-emoji">{project.image}</span>
            </div>

            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{locale === 'ja' ? project.description_ja : project.description_en}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} />
                    <span>{t('link_code')}</span>
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link demo"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} />
                    <span>{t('link_demo')}</span>
                  </motion.a>
                )}
              </div>
            </div>

            <motion.div
              className="card-glow"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
