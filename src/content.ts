// Sr. Will Barbearia: every fact on the page lives here.
// Source: Instagram @sr._will__ and @sr.will_academy, Linktree linktr.ee/sr._will__ (studied 10/11/2026).
// Photos and logo come from the client's own Instagram and Linktree.
// Prices and hours were NOT published by the client: they are marked `assumed` and must be confirmed.

export const BOOKING_URL = 'https://wa.me/message/5HBXFQY5QOELI1'
export const BOOKING_LABEL = 'Agendar pelo WhatsApp'

export const INSTAGRAM = {
  barbearia: 'https://www.instagram.com/sr._will__/',
  academy: 'https://www.instagram.com/sr.will_academy/',
}

// Client slot: an exported reel (mp4, no sound) in public/video/. Empty = the team photograph shows.
export const VIDEO = {
  hero: '' as string | string[],
}

const map = (q: string) => `https://www.openstreetmap.org/search?query=${encodeURIComponent(q)}`

export const UNITS = [
  { name: 'Unidade Cohab Nova', street: 'Rua 19, Cohab Nova', town: 'Limoeiro, PE', map: map('Rua 19 Cohab Nova Limoeiro Pernambuco') },
  { name: 'Unidade Praça da Bandeira', street: 'Praça da Bandeira', town: 'Limoeiro, PE', map: map('Praça da Bandeira Limoeiro Pernambuco') },
]

// assumed: confirm with the client
export const HOURS = [
  { days: 'Segunda a sexta', time: '9h às 20h' },
  { days: 'Sábado', time: '8h às 18h' },
  { days: 'Domingo', time: 'Fechado' },
]

export type Row = { name: string; price: string }
export type Service = { title: string; photo: string; alt: string; pos: string; rows: Row[] }

// assumed prices: confirm with the client
export const SERVICES: Service[] = [
  {
    title: 'Cortes',
    photo: 'img/corte-social.webp',
    alt: 'Cliente de perfil com corte social penteado para trás, em frente ao leão da Sr. Will',
    pos: '50% 30%',
    rows: [
      { name: 'Corte social', price: 'R$ 35' },
      { name: 'Fade ou taper fade', price: 'R$ 40' },
      { name: 'Corte infantil', price: 'R$ 30' },
    ],
  },
  {
    title: 'Barba',
    photo: 'img/barba.webp',
    alt: 'Cliente com barba alinhada usando a capa da Sr. Will Barbearia',
    pos: '50% 35%',
    rows: [
      { name: 'Barba', price: 'R$ 25' },
      { name: 'Corte e barba', price: 'R$ 60' },
      { name: 'Sobrancelha', price: 'R$ 15' },
    ],
  },
  {
    title: 'Tranças',
    photo: 'img/trancas.webp',
    alt: 'Cliente com tranças nagô e degradê, de perfil, na frente do leão da Sr. Will',
    pos: '50% 35%',
    rows: [
      { name: 'Tranças nagô', price: 'R$ 80' },
      { name: 'Pigmentação', price: 'R$ 25' },
      { name: 'Luzes', price: 'R$ 90' },
    ],
  },
]

export const GALLERY = [
  { photo: 'img/galeria-fade.webp', alt: 'Corte com degradê baixo e franja texturizada', pos: '50% 40%' },
  { photo: 'img/galeria-pomada.webp', alt: 'Cliente com o cabelo penteado com pomada, o barbeiro ao fundo', pos: '50% 40%' },
  { photo: 'img/galeria-equipe.webp', alt: 'Barbeiros da Sr. Will no salão com luz de LED no teto', pos: '50% 40%' },
  { photo: 'img/salao.webp', alt: 'Salão da Sr. Will com quatro barbeiros atendendo ao mesmo tempo', pos: '50% 50%' },
]

export const SPECIALTIES = ['Fade', 'Taper fade', 'Tranças', 'Barba', 'Social']
