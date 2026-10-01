let activeScroller = null;
export function setPageScroller(scroller) { activeScroller = scroller; }
export function scrollPageTo(top, immediate = false) {
  if (activeScroller) activeScroller.scrollTo(top, { immediate, duration: 1.05 });
  else window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' });
}
