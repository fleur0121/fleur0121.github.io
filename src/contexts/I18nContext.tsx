import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'

type Locale = 'en' | 'ja'

type Messages = Record<string, string>

const en: Messages = {
  hero_hi: 'Hello!',
  hero_im: "I'm",
  hero_role: 'Full Stack Developer',
  hero_desc_1: 'I’m passionate about creating smooth, accessible digital experiences.',
  hero_desc_2: 'I care deeply about user experience and am exploring full-stack development to build better products for everyone.',
  hero_skills: 'Skills',
  projects_title: 'Projects',
  projects_caption: 'Here are some of my works so far.',
  link_code: 'Code',
  link_demo: 'Demo',
  background_title: 'Background',
  background_caption: 'Education, experience, and highlights so far.',
  category_education: 'Education',
  category_experience: 'Experience',
  category_awards: 'Awards',
}

const ja: Messages = {
  hero_hi: 'こんにちは！',
  hero_im: '私は',
  hero_role: 'フルスタックエンジニア',
  hero_desc_1: 'フロントからバックエンドまで挑戦し、より良い体験を支えるエンジニアを目指しています。',
  hero_desc_2: 'ユーザー体験とアクセシビリティを大切に、心地よく使えるプロダクトづくりを心がけています。',
  hero_skills: 'スキル',
  projects_title: 'プロジェクト',
  projects_caption: 'これまでに作成したプロジェクトの一部をご紹介します',
  link_code: 'コード',
  link_demo: 'デモ',
  background_title: 'バックグラウンド',
  background_caption: '学歴・経験・これまでのハイライトをご紹介します',
  category_education: '学歴',
  category_experience: '経験',
  category_awards: '受賞',
}

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  toggleLocale: () => void
  t: (key: keyof typeof en) => string
}

const I18N_KEY = 'locale'
const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitial = (): Locale => {
    if (typeof window === 'undefined') return 'ja'
    const saved = localStorage.getItem(I18N_KEY) as Locale | null
    if (saved === 'en' || saved === 'ja') return saved
    const nav = navigator.language.toLowerCase()
    return nav.startsWith('ja') ? 'ja' : 'en'
  }

  const [locale, setLocaleState] = useState<Locale>(getInitial)

  useEffect(() => {
    localStorage.setItem(I18N_KEY, locale)
    document.documentElement.setAttribute('lang', locale)
  }, [locale])

  const t = useMemo(() => {
    const dict = locale === 'ja' ? ja : en
    return (key: keyof typeof en) => dict[key] ?? String(key)
  }, [locale])

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale: (l) => setLocaleState(l),
    toggleLocale: () => setLocaleState((l) => (l === 'ja' ? 'en' : 'ja')),
    t,
  }), [locale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
