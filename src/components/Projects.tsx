import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import './Projects.css'
import { useI18n } from '../contexts/I18nContext.tsx'
import { useMemo, useState, useCallback } from 'react'
import ProjectDetailsModal, { type ProjectSlide } from './ProjectDetailsModal'

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
      color: '#98FB98'
    },
    {
      id: 5,
      title: 'SimpleShell',
      description_ja: 'Cで実装したミニマルなUNIXシェル。プロセス制御と低レイヤOSの理解を目的に作成。',
      description_en: 'A minimal UNIX shell written in C.  Built to deepen understanding of process control and low-level OS concepts.',
      tags: ['C', 'CMake', 'POSIX'],
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
    {
      id: 7,
      title: 'Memory Allocator',
      description_ja: 'sbrk() によるヒープ管理で作ったメモリアロケーター。 配置戦略の切替に対応し、空きブロックの分割と統合を実装。',
      description_en: 'Built a custom memory allocator with sbrk()-based heap management. Supports switchable placement strategies (first-fit / best-fit / worst-fit) and implements free-block splitting and coalescing. ',
      tags: ['C', 'CMake', 'POSIX'],
      image: '🧠',
      github: 'https://github.com/fleur0121/memory-allocator',
      color: '#FFA07A'
    },
    {
      id: 8,
      title: 'Simple Group Chat',
      description_ja: 'C言語で実装したマルチスレッドTCPグループチャットサーバー＆クライアント。',
      description_en: 'A multithreaded TCP group chat in C (server & client). ',
      tags: ['C', 'POSIX', 'CMake'],
      image: '🗨️',
      github: 'https://github.com/fleur0121/SimpleGroupChatServer',
      color: '#AFEEEE'
    },
    {
      id: 9,
      title: 'Attendance Manager',
      description_ja: '実運用中の打刻・シフト管理システム。2社・150名超に提供。',
      description_en: 'Co-developing and operating an attendance management app (150+ users). Provides clock-in/out and shift management with Flask + Firebase. Strengthened fallbacks, security, and log monitoring; iterative improvements from user feedback.',
      tags: ['Flask', 'Firebase', 'LINE Messaging API', 'ngrok', 'Google Cloud'],
      image: '🕒',
      color: '#FFE4B5'
    },
  ]

  // Slides for presentation (keyed by project title)
  const slides = useMemo(() => {
    const m = new Map<string, ProjectSlide>()
    m.set('SimpleShell', {
      title: '簡易シェルの実装',
      emoji: '🐚',
      color: '#FFF3CD',
      bullets: [
        'fork() / execvp() によるコマンド実行',
        'foreground / background の切り替え対応',
        '内部コマンド（cd, pwd, exit）や履歴機能を実装',
        'SIGINT のハンドリングを通じてプロセス制御を理解'
      ],
      techTitle: '使用技術',
      techText: '🧰 C, POSIX API, Unix System Calls',
      message: 'プロセス管理やシステムコールの動きを理解'
    })
    m.set('Memory Allocator', {
      title: 'メモリアロケータの実装',
      emoji: '🧠',
      color: '#FFA07A',
      bullets: [
        'sbrk()を用いてヒープ領域を直接管理',
        'FIRST_FIT, BEST_FIT など複数戦略を切替',
        '空き領域の分割・併合アルゴリズムを実装',
        'ポインタ演算・ブロック管理構造体を設計'
      ],
      techTitle: '使用技術',
      techText: '🧰 C, sbrk(), Struct-based Memory Management',
      message: '低レイヤーのリソース制御の難しさと面白さを実感'
    })
    m.set('Simple Group Chat', {
      title: 'グループチャットサーバの開発',
      emoji: '🗨️',
      color: '#AFEEEE',
      bullets: [
        'socket通信で複数クライアントを接続',
        'pthreadで同時送受信を実現',
        'mutexロックでデータ競合を防止',
        '並行処理・同期制御を実践的に学習'
      ],
      techTitle: '使用技術',
      techText: '🧰 C, POSIX Threads, TCP Socket Programming',
      message: '実際に複数プロセスが動く環境を構築する楽しさを実感'
    })
    m.set('FlexyCook', {
      title: 'FlexyCook',
      emoji: '🥕',
      color: '#FFB6C1',
      bullets: [
        '4人チームによる4ヶ月にわたるWebアプリ開発',
        'レシピ検索 × ToDo管理アプリを企画・開発',
        'フロント／バックエンド／テスト整備を横断的に担当',
        '新技術を自習し、チームへの共有・導入・ドキュメント整備を実施',
        'GitHub Issuesでタスク優先度・担当を明確化し、進行を管理',
        'テスト・レビュー体制の導入で継続的な改善を促進'
      ],
      techTitle: '使用技術',
      techText: '🧰 React, Node.js, Express, Vite, Git/GitHub',
      message: 'フルスタックで開発を支えつつ、チームの基盤づくりと改善を主導'
    })
    m.set('Pr0nuc!ate', {
      title: 'Pr0nuc!ate',
      emoji: '📣',
      color: '#87CEEB',
      bullets: [
        '初対面のチームで24時間で発語支援アプリを開発',
        '音声認識・AIチャットボット・発音評価機能を実装',
        'プロトタイプを完成させ、総合2位＋Cloudflare賞を受賞',
        '限られた時間で判断・実装・共有を高速に回す経験'
      ],
      techTitle: '使用技術',
      techText: '🧰 React, JavaScript, MongoDB, Gemini API (AI), Speech-to-Text API',
      message: '短時間でも動く価値を届ける判断力を習得'
    })
    m.set('Attendance Manager', {
      title: '勤怠管理アプリの開発・運用',
      emoji: '🕒',
      color: '#FFE4B5',
      bullets: [
        '友人と共同開発・運用中（利用者150名以上）',
        '打刻・シフト管理を提供',
        'フォールバック設計／セキュリティ／ログ監視を強化',
        '利用者からのフィードバックで継続改善'
      ],
      techTitle: '使用技術',
      techText: '🧰 Flask (Python), Firebase, Google Cloud, LINE Messaging API, ngrok',
      message: '止まらないシステムを運用する責任とやりがいを実感'
    })
    return m
  }, [])

  const [open, setOpen] = useState<ProjectSlide | null>(null)
  const openIfHasSlide = useCallback((p: Project) => {
    const s = slides.get(p.title)
    if (s) setOpen(s)
  }, [slides])

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
            onClick={() => openIfHasSlide(project)}
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
      <ProjectDetailsModal isOpen={!!open} slide={open} onClose={() => setOpen(null)} />
    </section>
  )
}

export default Projects
