import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight, Award, Bell, Building2, Check, CircleCheck, GraduationCap,
  House, Lightbulb, LocateFixed, Menu, PackageOpen, Phone,
  Recycle, School, ShoppingBag, Sparkles, Truck, Users, X,
} from 'lucide-react'

type IconItem = { icon: LucideIcon; title: string; text: string }
type CounterProps = { value: number; suffix?: string }

const steps: IconItem[] = [
  { icon: Users, title: "S'inscrire", text: "Souscrivez à l'offre SCoPE sur notre application ou lors de nos tournées." },
  { icon: PackageOpen, title: 'Recevoir un kit', text: 'Nous vous remettons un kit fabriqué à partir de plastique recyclé.' },
  { icon: ShoppingBag, title: 'Trier vos plastiques', text: 'Remplissez votre kit avec vos déchets plastiques propres et secs.' },
  { icon: Bell, title: 'Biper SCoPE', text: 'Quand votre kit est plein, bipez-nous. Nous sommes alertés en temps réel.' },
  { icon: Recycle, title: 'Recycler', text: 'Nous collectons, trions, nettoyons et vendons aux centres de recyclage.' },
]

const audiences: IconItem[] = [
  { icon: House, title: 'Ménages', text: 'Triez vos déchets plastiques directement chez vous.' },
  { icon: Building2, title: 'Entreprises', text: 'Mettez en place une meilleure gestion de vos déchets.' },
  { icon: GraduationCap, title: 'Écoles & Universités', text: 'Sensibilisez les étudiants et créez de bonnes habitudes.' },
  { icon: School, title: 'Centres de recyclage', text: 'Accédez à une ressource plastique mieux triée et valorisée.' },
]

const features = [
  'Système d’alerte (Eco Beep) pour une collecte rapide',
  'Suivi en temps réel de vos demandes de levée',
  'Information et sensibilisation des populations',
  'Mise à disposition de la data pour plus de transparence',
  'Connexion directe avec les centres de recyclage',
]

function Counter({ value, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 1200, 1)
        setCount(Math.floor(progress * value))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
      observer.disconnect()
    }, { threshold: 0.5 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{count}{suffix}</span>
}

function IconBox({ icon: Icon }: { icon: LucideIcon }) {
  return <span className="icon-box"><Icon size={18} strokeWidth={2.2} /></span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="nav wrap">
          <a className="brand" href="#accueil" onClick={closeMenu}>
            <img src="/assets/downloads/logo.jpg" alt="Logo SCoPE" className="brand-mark" />
            <span className="brand-text"><strong>SCoPE</strong><small>Sorting & Collecting Plastics<br />in our Environment</small></span>
          </a>
          <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Navigation principale">
            <a href="#accueil" onClick={closeMenu}>Accueil</a>
            <a href="#fonctionnalites" onClick={closeMenu}>Fonctionnalités</a>
            <a href="#comment" onClick={closeMenu}>Comment ça marche</a>
            <a href="#apropos" onClick={closeMenu}>À propos</a>
          </nav>
          <div className="nav-actions"><a href="#inscription" className="button button-primary">S'inscrire</a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></div>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil"><div className="wrap hero-grid"><div className="hero-copy"><span className="badge"><Sparkles size={15} /> Pour un Lomé plus propre</span><h1>Ensemble, donnons une seconde vie au <em>plastique.</em></h1><p className="lead">SCoPE connecte les ménages, entreprises et institutions à des solutions de collecte et de recyclage des déchets plastiques à Lomé.</p><div className="hero-actions"><a href="#inscription" className="button button-primary">S'inscrire à SCoPE <ArrowRight size={17} /></a><a href="#comment" className="button button-outline">Découvrir la solution</a></div><div className="hero-points"><div><IconBox icon={ShoppingBag} /><span><strong>Trier</strong><small>Adoptez les bons gestes au quotidien</small></span></div><div><IconBox icon={Truck} /><span><strong>Collecter</strong><small>Nous venons récupérer vos kits</small></span></div><div><IconBox icon={Recycle} /><span><strong>Recycler</strong><small>Vos déchets deviennent des ressources</small></span></div></div></div><div className="phone-stage"><img src="/assets/screenshot-app.png" alt="Aperçu de l'application SCoPE" /></div></div></section>

        <section className="challenge section-soft"><div className="wrap challenge-grid"><div><span className="eyebrow">LE DÉFI</span><h2>Le plastique, un vrai <em>problème</em> à Lomé</h2></div><div><div className="stat-grid"><article><IconBox icon={ShoppingBag} /><strong><Counter value={3} suffix="M+" /></strong><p>tonnes de déchets produits chaque année à Lomé</p></article><article><IconBox icon={Truck} /><strong><Counter value={300} suffix="K" /></strong><p>tonnes seulement sont collectées et acheminées au centre de traitement</p></article><article className="warning"><IconBox icon={LocateFixed} /><strong>Pollution</strong><p>Insalubrité, maladies et risques d'inondations accrus</p></article><article className="warning"><IconBox icon={Users} /><strong>Manque</strong><p>de tri, de sensibilisation et de systèmes de collecte efficaces</p></article></div><p className="challenge-note"><Sparkles size={16} /> SCoPE transforme ce problème en solution durable.</p></div></div></section>

        <section className="how" id="comment"><div className="wrap"><span className="eyebrow">COMMENT ÇA MARCHE ?</span><h2>Un service simple en 5 étapes</h2><div className="steps">{steps.map(({ icon: Icon, title, text }, index) => <article className="step" key={title}><div className="step-icon"><Icon /><b>{index + 1}</b></div><strong>{title}</strong><p>{text}</p></article>)}</div></div></section>

        <section className="why" id="fonctionnalites"><div className="wrap why-grid"><div><span className="eyebrow">POURQUOI SCOPE ?</span><h2>La technologie au service de <em>l'environnement</em></h2><ul className="feature-list">{features.map(feature => <li key={feature}><CircleCheck size={18} /> {feature}</li>)}</ul><a href="#inscription" className="button button-primary">Explorer l'application <ArrowRight size={17} /></a></div><div className="phone-stage"><img src="/assets/screenshot-app.png" alt="Aperçu de l'application SCoPE" /></div><div className="audience-list"><h3>Pour qui ?</h3>{audiences.map(({ icon: Icon, title, text }) => <div className="audience" key={title}><IconBox icon={Icon} /><span><strong>{title}</strong><small>{text}</small></span></div>)}</div></div></section>

        <section className="impact section-soft" id="apropos"><div className="wrap impact-grid"><div><h2>Notre impact aujourd'hui</h2><div className="impact-stats"><div><IconBox icon={Users} /><span><strong><Counter value={47} /></strong><small>utilisateurs actifs</small></span></div><div><IconBox icon={Bell} /><span><strong>20+</strong><small>collectes déclenchées</small></span></div><div><IconBox icon={Lightbulb} /><span><strong>2013</strong><small>naissance de l'idée de SCoPE</small></span></div></div></div><div className="awards"><h3><Award size={18} /> Reconnu et récompensé</h3><p><Check size={15} /> Top 3 International Global Urban DATA Fest 2015</p><p><Check size={15} /> Finaliste Startup Challenge Web2Day Nantes 2015</p><p><Check size={15} /> Pisté pour le 9ème Youth Forum de l'UNESCO à Paris</p></div></div></section>

        <section className="cta wrap" id="inscription"><div><h2>Et si votre prochain déchet plastique devenait une ressource ?</h2><p>Rejoignez SCoPE et participez à une meilleure gestion des déchets plastiques à Lomé.</p></div><div className="cta-actions"><a href="mailto:contact@scope.tg" className="button button-white">S'inscrire maintenant <ArrowRight size={17} /></a><a href="mailto:contact@scope.tg" className="button button-ghost">Nous contacter</a></div></section>
      </main>

      <footer><div className="wrap footer-grid"><div className="footer-about"><a className="brand" href="#accueil"><img src="/assets/downloads/logo.jpg" alt="Logo SCoPE" className="brand-mark" /><span className="brand-text"><strong>SCoPE</strong></span></a><p>Sorting & Collecting Plastics in our Environment. Une solution togolaise pour la collecte et le recyclage du plastique.</p><div className="socials"><a href="https://www.facebook.com/MizamikeSCOPE/" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a><a href="https://www.instagram.com/we_scope/" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a><a href="https://www.linkedin.com/company/77624938" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a><a href="https://www.youtube.com/channel/UCZMfKimZ4qtXNUIo60Llf_w" aria-label="YouTube"><i className="fa-brands fa-youtube" /></a></div></div>{[['SCoPE', 'À propos', 'Notre mission', 'Notre équipe', 'Actualités'], ['Services', 'Collecte', 'Kits de tri', 'Sensibilisation', 'Recyclage'], ['Ressources', 'FAQ', 'Guides', 'Blog', 'Données']].map(([heading, ...items]) => <div key={heading}><h3>{heading}</h3>{items.map(item => <a href="#" key={item}>{item}</a>)}</div>)}<div><h3>Contact</h3><p><Phone size={14} /> 609 23 611</p><p>contact@scope.tg</p><p>Lomé, Togo</p></div></div><div className="footer-bottom">© 2026 SCoPE. Tous droits réservés.</div></footer>
    </>
  )
}

export default App
