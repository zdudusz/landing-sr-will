// True while scripts/prerender.mjs snapshots the page: render the finished state, mount no moment.
export const PRERENDER = typeof location !== 'undefined' && new URLSearchParams(location.search).has('prerender')
