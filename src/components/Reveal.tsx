import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { PRERENDER } from '../env'

type Props = { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'article' } & Omit<HTMLMotionProps<'div'>, 'children'>

// Content arriving as its section scrolls in: a short rise out of a blur, once.
export function Reveal({ children, delay = 0, className, as = 'div', ...rest }: Props) {
  const still = useReducedMotion() || PRERENDER
  const Tag = motion[as] as typeof motion.div
  return (
    <Tag
      className={className}
      initial={still ? false : { opacity: 0, y: 32, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// A photograph uncovered from the bottom like a cape coming off.
export function RevealPhoto({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const still = useReducedMotion() || PRERENDER
  // The observer watches the outer box: a box clipped to nothing is never seen as "in view".
  return (
    <motion.div className={className} initial={still ? false : 'hidden'} whileInView="shown" viewport={{ once: true, amount: 0.2 }}>
      <motion.div
        variants={{ hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, shown: { clipPath: 'inset(0% 0% 0% 0%)' } }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
