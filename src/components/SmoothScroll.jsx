import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setPageScroller } from './scrollController';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis;
    function configure() {
      lenis?.destroy();
      lenis = preference.matches ? null : new Lenis({ autoRaf: true, lerp: 0.12, smoothWheel: true, syncTouch: false, anchors: true });
      setPageScroller(lenis);
    }
    configure();
    preference.addEventListener('change', configure);
    const anchorFrame = requestAnimationFrame(() => {
      if (window.location.hash === '#manufacturing') {
        const target = document.getElementById('manufacturing');
        if (target) {
          if (lenis) lenis.scrollTo(target, { immediate: true });
          else target.scrollIntoView({ behavior: 'instant' });
        }
      }
    });
    return () => {
      cancelAnimationFrame(anchorFrame);
      preference.removeEventListener('change', configure);
      setPageScroller(null);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
