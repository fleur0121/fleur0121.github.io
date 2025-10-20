import { useEffect } from 'react'
import { X } from 'lucide-react'
import './ProjectDetailsModal.css'

export type ProjectSlide = {
	title: string
	description?: string
	emoji?: string
	color?: string
	bullets?: string[]
	message?: string
	techTitle?: string
	techText?: string
}

type Props = {
	isOpen: boolean
	slide: ProjectSlide | null
	onClose: () => void
}

export default function ProjectDetailsModal({ isOpen, slide, onClose }: Props) {
	useEffect(() => {
		if (!isOpen) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		document.addEventListener('keydown', onKey)
		const prev = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = prev
			document.removeEventListener('keydown', onKey)
		}
	}, [isOpen, onClose])

	if (!isOpen || !slide) return null

	return (
		<div className="pd-backdrop" onClick={onClose}>
			<div className="pd-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
				<button className="pd-close" aria-label="Close" onClick={onClose}>
					<X size={22} />
				</button>

				<div className="pd-header" style={{ background: slide.color ?? '#f5f7ff' }}>
					{slide.emoji && <div className="pd-emoji">{slide.emoji}</div>}
					<h3 className="pd-title">{slide.title}</h3>
				</div>

				<div className="pd-content">
					{slide.description && <p className="pd-desc">{slide.description}</p>}

					{slide.bullets && slide.bullets.length > 0 && (
						<div className="pd-section">
							<ul className="pd-list">
								{slide.bullets.map((b, i) => (
									<li key={i}>{b}</li>
								))}
							</ul>
						</div>
					)}

					{slide.message && (
						<div className="pd-quote">{slide.message}</div>
					)}

								{(slide.techTitle || slide.techText) && (
									<div className="pd-tech">
										{slide.techTitle && <div className="pd-tech-title">{slide.techTitle}</div>}
										{slide.techText && <div className="pd-tech-text">{slide.techText}</div>}
									</div>
								)}
				</div>
			</div>
		</div>
	)
}

