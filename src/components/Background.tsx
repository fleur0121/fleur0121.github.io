import { motion } from "framer-motion";
import "./Background.css";
import { useI18n } from "../contexts/I18nContext.tsx";

type Category = "education" | "experience" | "awards";

interface TimelineItem {
  id: number;
  category: Category;
  period: string;
  title_en: string;
  title_ja: string;
  org_en?: string;
  org_ja?: string;
  details_en?: string[];
  details_ja?: string[];
  icon: string;
  color: string;
  // For ordering within categories (e.g., experience):
  startYear?: number;
  endYear?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Background = () => {
  const { t, locale } = useI18n();

  const items: TimelineItem[] = [
    // Education
    {
      id: 1,
      category: "education",
      period: "2024 — Present",
      title_en: "Simon Fraser University — Computing Science",
      title_ja: "Simon Fraser University（Computing Science）",
      details_en: [
        "Coursework: OS, Networks, Databases, Systems Programming, Algorithms/Data Structures.",
        "Studied DevOps, testing/debugging, memory management, and fundamentals of statistics/mathematics.",
        "Technologies: C/C++, Haskell, Rust, RISC-V/Assembly, Docker, Shell, Git/GitHub, MySQL, MongoDB, CMake, Linux, gdb/Valgrind."
      ],
      details_ja: [
        "OS・ネットワーク・データベース・システムプログラミング・アルゴリズム／データ構造などを履修",
        "DevOps・テスト／デバッグ・メモリ管理・統計／数学の基礎を修得",
        "習得技術：C/C++、Haskell、Rust、RISC-V/アセンブリ、Docker、Shell、Git/GitHub, MySQL、MongoDB、CMake、Linux、gdb／Valgrind"
      ],
      icon: "🎓",
      color: "#8A2BE2",
    },
    {
      id: 2,
      category: "education",
      period: "2021 — 2024",
      title_en: "Langara College - Computer Science",
      title_ja: "Langara College (Computer Science)",
      org_en: "Project: FlexyCook",
      org_ja: "プロジェクト：FlexyCook",
      details_en: [
        "Learned programming through practical coursework (Python/C), plus algorithms/data structures and CS fundamentals.",
        "Also studied project management and academic writing for technical and research reports.",
        "Technologies: C++, Java (JavaFX), Python, HTML/CSS, JavaScript, Git, Linux, Valgrind."

      ],
      details_ja: [
        "実践的なコースワークを通じてプログラミングを学修。",
        "プロジェクト管理や技術・研究レポートの学術的な書き方も修得。",
        "習得技術：C++、Java（JavaFX）、Python、HTML・CSS、JavaScript、Git、Linux、Valgrind"
      ],
      icon: "🎓",
      color: "#7E57C2",
    },

    // Experience / Projects
    {
      id: 3,
      category: "experience",
      period: "2025 — Present",
      title_en:
        "Attendance & Shift Management System — development & operation",
      title_ja: "勤怠管理システム運用・開発",
      details_en: [
        "Developing and operating an attendance & shift scheduling app for SMEs.",
        "Running in production and iterating based on user feedback.",
        "Stack: Python (Flask), HTML/CSS/JavaScript, Firebase, Google Sheets API, LINE Messaging API"
      ],
      details_ja: [
        "中小企業向けの勤怠管理・シフト作成アプリケーションを開発・運用。",
        "本番運用でのフィードバックを反映し、継続的に改善。",
        "使用技術：Python（Flask）、HTML／CSS／JavaScript、Firebase、Google Sheets API、LINE Messaging API"
      ],
      icon: "�️",
      color: "#00BFA6",
      startYear: 2024,
    },
    {
      id: 4,
      category: "awards",
      period: "2023, 2025",
      title_en: "Dean's Honer Roll",
      title_ja: "Dean's Honer Roll",
      details_en: [
        "Recognized on the Dean’s Honor Roll for academic excellence.",
      ],
      details_ja: [
        "優秀な成績により Dean’s Honor Roll に選出。",
      ],
      icon: "🏆",
      color: "#26C6DA",
      startYear: 2024,
    },

    // Awards
    {
      id: 5,
      category: "awards",
      period: "2025",
      title_en:
        "Cmd-f 2025 — Runner-up & Best Use of Cloudflare AI",
      title_ja: "Cmd-f 2025：準優勝／Best Use of Cloudflare AI",
      org_en: "Project: Pr0nuciate",
      org_ja: "プロジェクト：Pr0nuciate",
      details_en: [
     "Built a speech-practice web app for people with speech impairments at a UBC-run student hackathon.",
     "Productized in 24 hours and delivered a live demo & pitch."
      ],
      details_ja: [
        "UBC主催の学生ハッカソンで、発語障害の方向けの発語練習Webアプリを開発。",
        "24時間でプロダクト化し、デモとピッチを実施。",
      ],
      icon: "🏆",
      color: "#FFA726",
    },
  ];

  // Order items so that experience entries are oldest-first, while keeping category blocks
  const getYear = (it: TimelineItem) => it.startYear ?? it.endYear ?? 9999;
  const itemsOrdered: TimelineItem[] = [
    ...items.filter((i) => i.category === "education"),
    ...items
      .filter((i) => i.category === "experience")
      .sort((a, b) => getYear(a) - getYear(b)),
    ...items.filter((i) => i.category === "awards"),
  ];

  const categoryLabel = (c: Category) => {
    if (c === "education") return t("category_education");
    if (c === "experience") return t("category_experience");
    return t("category_awards");
  };

  return (
    <section className="background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="background-header"
      >
        <h2>
          <span className="emoji">📚</span> {t("background_title")}
        </h2>
        <p>{t("background_caption")}</p>
      </motion.div>

      <motion.div
        className="timeline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {itemsOrdered.map((it) => (
          <motion.div
            key={it.id}
            className={`timeline-item category-${it.category}`}
            variants={itemVariants}
            style={
              {
                // @ts-ignore css variable
                "--accent": it.color,
              } as React.CSSProperties
            }
          >
            <div className="timeline-side">
              <div className="dot" aria-hidden>
                <span className="dot-emoji">{it.icon}</span>
              </div>
              <div className="period">{it.period}</div>
              <div className="cat">{categoryLabel(it.category)}</div>
            </div>
            <div className="timeline-content">
              <h3>{locale === "ja" ? it.title_ja : it.title_en}</h3>
              {(it.org_en || it.org_ja) && (
                <div className="org">
                  {locale === "ja" ? it.org_ja : it.org_en}
                </div>
              )}

              <ul className="details">
                {(locale === "ja" ? it.details_ja : it.details_en)?.map(
                  (d, i) => (
                    <li key={i}>{d}</li>
                  )
                )}
              </ul>
            </div>
            <motion.div
              className="item-glow"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Background;
