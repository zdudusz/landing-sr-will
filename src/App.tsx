import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import BlurText from './components/BlurText'
import BackgroundFX from './components/BackgroundFX'
import { Reveal, RevealPhoto } from './components/Reveal'
import { PRERENDER } from './env'
import FadingVideo from './components/FadingVideo'
import { ArrowUpRight, ClockIcon, MapPinIcon, MenuIcon } from './components/Icons'
import { BOOKING_LABEL, BOOKING_URL, GALLERY, HOURS, INSTAGRAM, SERVICES, SPECIALTIES, UNITS, VIDEO } from './content'

const NAV = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#cortes', label: 'Cortes' },
  { href: '#academy', label: 'Academy' },
  { href: '#visita', label: 'Unidades' },
]

const ext = { target: '_blank', rel: 'noopener' } as const

function useEnter() {
  const reduce = useReducedMotion() || PRERENDER
  return (delay: number) => ({
    initial: reduce ? false : ({ filter: 'blur(8px)', opacity: 0, y: 20 } as const),
    animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  })
}

function BookButton({ size = 'md', id, className = '' }: { size?: 'sm' | 'md' | 'xl'; id?: string; className?: string }) {
  const cls = size === 'sm' ? 'btn--sm' : size === 'xl' ? 'btn--xl min-h-[56px] px-7 text-base' : ''
  return (
    <a id={id} className={`btn btn--primary ${cls} ${className}`} href={BOOKING_URL} {...ext}>
      {BOOKING_LABEL}
      <ArrowUpRight />
    </a>
  )
}

function Logo() {
  return (
    <a href="#conteudo" className="flex h-12 items-center gap-2.5" aria-label="Sr. Will Barbearia, início">
      <img src="img/leao.png" alt="" aria-hidden="true" width={217} height={346} className="h-11 w-auto" />
      <span className="whitespace-nowrap font-heading text-lg font-extrabold tracking-tight">
        Sr. Will <span className="font-medium text-white/70">Barbearia</span>
      </span>
    </a>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="nav fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-md">
      <div className="wrap flex h-[72px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center md:flex" aria-label="Principal">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className="nav-word inline-flex min-h-[44px] items-center px-3 font-heading text-sm font-semibold text-white/85 hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>
        <span className="hidden md:block"><BookButton size="sm" /></span>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 md:hidden"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen(o => !o)}
        >
          <MenuIcon open={open} />
        </button>
      </div>
      {open && (
        <div id="menu" className="fixed inset-0 top-[72px] flex flex-col bg-black px-5 pb-8 pt-6 md:hidden">
          <nav className="flex flex-col" aria-label="Menu">
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 font-heading text-3xl font-extrabold">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto" onClick={() => setOpen(false)}>
            <BookButton className="w-full" />
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  const enter = useEnter()
  const hasVideo = Array.isArray(VIDEO.hero) ? VIDEO.hero.length > 0 : VIDEO.hero !== ''
  return (
    <section className="relative overflow-hidden lg:h-screen" style={{ minHeight: '100svh' }} data-enter aria-labelledby="hero-h">
      <div className="wrap relative z-10 flex min-h-[100svh] flex-col pb-8 pt-[104px] lg:h-full">
        <div className="hero-text grid flex-1 items-start gap-8 lg:grid-cols-2 lg:gap-6">
          <div>
            <motion.p {...enter(0.3)} className="inline-flex items-center gap-2 font-body text-sm text-white/85">
              <span className="font-bold text-brand">2 unidades:</span>
              Cohab Nova e Praça da Bandeira
            </motion.p>

            <BlurText
              as="h1"
              id="hero-h"
              text="Barbearia Sr. Will em Limoeiro, PE"
              align="left"
              className="mt-6 font-heading text-[2.6rem] font-extrabold leading-[1] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.6rem]"
            />

            <motion.p {...enter(0.7)} className="mt-5 max-w-lg font-body text-lg leading-snug text-white/85">
              Fade, taper fade, barba e tranças com horário marcado pelo WhatsApp.
            </motion.p>

            <motion.div {...enter(0.9)} className="mt-7">
              <BookButton size="xl" id="hero-cta" />
            </motion.div>

            <motion.ul {...enter(1.1)} className="mt-8 hidden gap-4 sm:flex" aria-label="A barbearia em números">
              <li className="panel w-[220px] rounded-2xl p-5">
                <MapPinIcon className="h-6 w-6 text-brand" />
                <p className="mt-3 font-heading text-3xl font-extrabold tracking-tight">2 unidades</p>
                <p className="mt-1 text-sm text-white/75">No mesmo padrão de corte</p>
              </li>
              <li className="panel w-[220px] rounded-2xl p-5">
                <ClockIcon className="h-6 w-6 text-brand" />
                <p className="mt-3 font-heading text-3xl font-extrabold tracking-tight">Desde 2022</p>
                <p className="mt-1 text-sm text-white/75">Formando barbeiros na SW Academy</p>
              </li>
            </motion.ul>
          </div>

          <motion.figure {...enter(0.5)} className="blend-all relative overflow-hidden">
            {/* Client slot: VIDEO.hero in content.ts plays here over the team photograph. */}
            <img
              className="tone aspect-[16/9] w-full object-cover sm:aspect-square lg:aspect-auto lg:h-[calc(100svh-230px)]"
              src="img/equipe.webp"
              alt="A equipe da Sr. Will Barbearia de camiseta preta e suspensório"
              fetchPriority="high"
              width={1600}
              height={1600}
              style={{ objectPosition: '50% 25%' }}
            />
            {hasVideo && <FadingVideo src={VIDEO.hero} poster="img/equipe.webp" className="absolute inset-0 h-full w-full object-cover" />}
          </motion.figure>
        </div>

        <motion.div {...enter(1.3)} className="mt-6 flex flex-col items-start gap-2">
          <p className="text-sm font-semibold text-brand">Os cortes mais pedidos</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-1">
            {SPECIALTIES.map(s => (
              <li key={s} className="font-heading text-xl font-bold text-white/90 md:text-2xl">{s}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

function Label({ children }: { children: string }) {
  return <p className="text-sm font-semibold text-brand">{children}</p>
}

function Visit() {
  return (
    <section className="section section--one flex flex-col justify-center" id="visita" data-place="visit" aria-labelledby="visita-h" style={{ ['--h' as string]: 1 }}>
      <div className="wrap">
        <h2 id="visita-h" className="t-h2">Duas unidades em <mark>Limoeiro</mark></h2>
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
          <Reveal className="visit panel rounded-2xl p-6 md:p-8">
            <div className="grid gap-8 sm:grid-cols-2">
              {UNITS.map(u => (
                <div key={u.name}>
                  <Label>{u.name}</Label>
                  <address className="mt-2 not-italic">
                    <a className="link font-heading text-2xl font-bold" href={u.map} {...ext}>{u.street}</a>
                    <span className="mt-1 block text-base text-white/70">{u.town}</span>
                  </address>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-line pt-6">
              <Label>Horário de funcionamento</Label>
              <dl className="mt-2" data-assumed>
                {HOURS.map(h => (
                  <div key={h.days} className="flex justify-between border-b border-line py-2.5 text-base">
                    <dt className="text-white/75">{h.days}</dt>
                    <dd className="font-semibold tabular-nums">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-base text-white/75">
                Atendimento com hora marcada. <a className="link text-white" href={INSTAGRAM.barbearia} {...ext}>Ver os cortes no Instagram</a>
              </p>
            </div>
          </Reveal>
          <RevealPhoto delay={0.15}>
            <a className="m-zoom card blend-side" href={INSTAGRAM.barbearia} {...ext} aria-label="Sr. Will Barbearia no Instagram">
              <img className="tone aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-[calc(100svh-330px)]" src="img/salao-leao.webp" alt="Willian e a equipe sentados no salão, na frente do leão dourado da Sr. Will" width={1200} height={1210} style={{ objectPosition: '50% 35%' }} />
            </a>
          </RevealPhoto>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section section--one flex flex-col justify-center" id="servicos" aria-labelledby="servicos-h" style={{ ['--h' as string]: 1 }}>
      <div className="wrap">
        <h2 id="servicos-h" className="t-h2">Cortes, barba e <mark>tranças</mark></h2>
        <p className="mt-3 text-lg text-white/75">Valores por serviço. Pagamento na unidade, depois do corte.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal as="article" delay={i * 0.12} key={s.title} className="panel card flex flex-col overflow-hidden rounded-2xl">
              <a className="m-zoom blend-b" href={BOOKING_URL} {...ext} aria-label={`Agendar ${s.title.toLowerCase()} pelo WhatsApp`}>
                <img className="tone aspect-[2/1] w-full object-cover md:aspect-[5/4]" src={s.photo} alt={s.alt} loading="lazy" width={361} height={640} style={{ objectPosition: s.pos }} />
              </a>
              <div className="p-5">
                <h3 className="font-heading text-2xl font-extrabold tracking-tight">{s.title}</h3>
                <ul className="rows mt-2">
                  {s.rows.map(r => (
                    <li key={r.name}>
                      <span>{r.name}</span>
                      <span className="rows__value" data-assumed>{r.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="section section--one flex flex-col justify-center" id="cortes" aria-labelledby="cortes-h" style={{ ['--h' as string]: 1 }}>
      <div className="wrap">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 id="cortes-h" className="t-h2">Galeria de <mark>cortes</mark></h2>
          <a className="link font-heading text-base font-bold md:mb-2" href={INSTAGRAM.barbearia} {...ext}>Ver mais no Instagram</a>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {GALLERY.map((g, i) => (
            <li key={g.photo}>
              <RevealPhoto delay={i * 0.12}>
                <a className="m-zoom card blend-b" href={INSTAGRAM.barbearia} {...ext} aria-label="Ver este corte no Instagram">
                  <img className="tone aspect-[4/5] w-full object-cover lg:aspect-auto lg:h-[calc(100svh-320px)]" src={g.photo} alt={g.alt} width={360} height={640} style={{ objectPosition: g.pos }} />
                </a>
              </RevealPhoto>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Statement() {
  return (
    <section className="section section--one flex items-start lg:pt-[160px]" id="frase" data-moment="word-highlight" aria-label="Sobre a barbearia" style={{ ['--h' as string]: 1 }}>
      <div className="wrap">
        <p className="mb-6 text-sm font-semibold text-brand">Sr. Will Barbearia</p>
        <p className="mo-wh__text">
          Não é só corte. É <strong>confiança renovada</strong>. O degradê sobe pente a pente, a navalha fecha o contorno e você confere tudo no espelho antes de levantar da cadeira.
        </p>
      </div>
    </section>
  )
}

function Academy() {
  return (
    <section className="section section--one flex flex-col justify-center" id="academy" aria-labelledby="academy-h" style={{ ['--h' as string]: 1 }}>
      <div className="wrap grid items-start gap-6 lg:grid-cols-2">
        <Reveal>
          <Label>SW Academy</Label>
          <h2 id="academy-h" className="t-h2 mt-3">Curso de barbeiro de <mark>60 horas</mark></h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/85">
            Desde 2022 o Willian forma barbeiros em Limoeiro. O curso iniciante tem 60 horas de aula na cadeira, com fade, taper e acabamento, e termina com certificado da SW Academy.
          </p>
          <a className="btn btn--secondary mt-8" href={INSTAGRAM.academy} {...ext}>
            Ver as turmas no Instagram
            <ArrowUpRight />
          </a>
        </Reveal>
        <RevealPhoto delay={0.15}>
          <a className="m-zoom card blend-side" href={INSTAGRAM.academy} {...ext} aria-label="SW Academy no Instagram">
            <img className="tone aspect-[4/5] w-full object-cover lg:aspect-auto lg:h-[calc(100svh-220px)]" src="img/academy.webp" alt="Dois alunos da SW Academy com o certificado, ao lado de Willian e de um barbeiro" width={1200} height={1600} style={{ objectPosition: '50% 55%' }} />
          </a>
        </RevealPhoto>
      </div>
    </section>
  )
}

function Closing() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer closing section relative flex flex-col overflow-hidden border-t border-white/10 !pb-[76px]" id="agendar" aria-labelledby="agendar-h">
      <div className="wrap relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col">
          <div className="grid flex-1 items-start gap-8 pt-4 lg:grid-cols-2 lg:gap-6">
            <div>
              <h2 id="agendar-h" className="t-h2">Horário marcado pelo <mark>WhatsApp</mark></h2>
              <p className="mt-4 max-w-md text-lg text-white/80">Escolha a unidade, o serviço e o horário na conversa. A resposta chega pelo mesmo WhatsApp.</p>
              <BookButton size="xl" id="close-cta" className="mt-7" />
            </div>
            <div className="hidden justify-end lg:flex">
              <img className="h-[280px] w-auto" src="img/logo-sr-will.png" alt="Logo da Sr. Will Barbearia: um leão de coroa" loading="lazy" width={321} height={497} />
            </div>
          </div>

          <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {UNITS.map(u => (
              <div key={u.name}>
                <Label>{u.name}</Label>
                <address className="mt-2 not-italic text-base">
                  <a className="link" href={u.map} {...ext}>{u.street}</a>
                  <span className="block text-white/65">{u.town}</span>
                </address>
              </div>
            ))}
            <div>
              <Label>Horários</Label>
              <dl className="mt-2 text-base" data-assumed>
                {HOURS.map(h => (
                  <div key={h.days} className="flex justify-between gap-4"><dt className="text-white/65">{h.days}</dt><dd className="tabular-nums">{h.time}</dd></div>
                ))}
              </dl>
            </div>
            <div>
              <Label>Instagram</Label>
              <ul className="mt-1 text-base">
                <li><a className="link inline-flex min-h-[44px] items-center" href={INSTAGRAM.barbearia} {...ext}>Sr. Will Barbearia</a></li>
                <li><a className="link inline-flex min-h-[44px] items-center" href={INSTAGRAM.academy} {...ext}>SW Academy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <span>© {year} Sr. Will Barbearia, Limoeiro, PE</span>
          <span>Fotos: Instagram @sr._will__ e @sr.will_academy</span>
        </div>
      </div>
    </footer>
  )
}

function ActionBar() {
  const [hidden, setHidden] = useState(true)
  useEffect(() => {
    // Off the first screen, and away from any screen that already shows the booking button.
    const state = new Map<Element, boolean>()
    const targets = ['hero-cta', 'agendar'].map(id => document.getElementById(id)).filter(Boolean) as Element[]
    const update = () => setHidden([...state.values()].some(Boolean) || window.scrollY < window.innerHeight * 0.6)
    const io = new IntersectionObserver(entries => { entries.forEach(e => state.set(e.target, e.isIntersecting)); update() })
    targets.forEach(t => io.observe(t))
    window.addEventListener('scroll', update, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', update) }
  }, [])
  return (
    <nav className="actionbar" data-hidden={hidden} aria-label="Ação rápida">
      <a className="btn btn--primary w-full shadow-lg shadow-black/60" href={BOOKING_URL} {...ext} tabIndex={hidden ? -1 : 0}>
        {BOOKING_LABEL}
        <ArrowUpRight />
      </a>
    </nav>
  )
}

export default function App() {
  useEffect(() => {
    if (PRERENDER) return
    // The skill's kit, served as plain files from public/assets: the hover layer and the dealt moment.
    for (const path of ['assets/motion/motion.js', 'assets/moments/moments.js']) {
      const url = new URL(path, document.baseURI).href
      import(/* @vite-ignore */ url).catch(() => document.documentElement.classList.add('mo-safe'))
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navbar />
      <main id="conteudo" tabIndex={-1}>
        <BackgroundFX />
        <Hero />
        <Visit />
        <Services />
        <Gallery />
        <Statement />
        <Academy />
      </main>
      <Closing />
      <ActionBar />
    </>
  )
}
