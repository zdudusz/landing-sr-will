# Sr. Will Barbearia: landing page

React + Vite + TypeScript + Tailwind + Framer Motion, feita com a skill `design-taste-frontend`
(taste-skill 2.5.1). Visual urbano: preto, amarelo do leão (`#ECD012`), Montserrat 800 + Barlow.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ (com o HTML pré-renderizado para o Google)
```

O `build` usa o Edge/Chrome instalado para pré-renderizar a página (`scripts/prerender.mjs`).
Se o navegador estiver em outro lugar, defina `CHROME_PATH`.

## Onde mudar o conteúdo

Tudo fica em `src/content.ts`: link do WhatsApp, unidades, horários, preços, galeria.

## Fotos e logo

Todas as fotos são do próprio Instagram da barbearia (@sr._will__ e @sr.will_academy), e a logo
do leão veio do avatar do Linktree, recortada com fundo transparente (`public/img/logo-sr-will.png`
e `public/img/leao.png`).

- `equipe.webp`, `academy.webp` e `salao-leao.webp` estão em alta resolução (posts de foto).
- As fotos dos serviços e da galeria vêm das capas dos reels, que o Instagram só entrega em
  360x640 sem login. Ficam boas no tamanho em que aparecem, mas vale pedir ao cliente os originais
  (mesmo nome de arquivo em `public/img/`) para ficarem mais nítidas.
- Logo em vetor (SVG/PDF) do cliente deixaria o leão perfeito em qualquer tamanho.

## O que falta o cliente confirmar

**Preços e horários foram estimados** (não estão publicados). Estão marcados com `data-assumed`:

- Horários: seg a sex 9h às 20h, sábado 8h às 18h, domingo fechado.
- Preços: corte social 35, fade/taper 40, infantil 30, barba 25, corte e barba 60, sobrancelha 15,
  tranças nagô 80, pigmentação 25, luzes 90.

**Vídeo (opcional)**: exportar um reels em MP4 sem som para `public/video/` e preencher `VIDEO.hero`
em `src/content.ts`; ele toca com fade sobre a foto da equipe no topo.

O link de agendamento online do Linktree (dikidi) está fora do ar; a página agenda pelo WhatsApp.
