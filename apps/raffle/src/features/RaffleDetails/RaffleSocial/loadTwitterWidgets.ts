'use client';

/**
 * Minimal typings for the parts of X's (Twitter's) `widgets.js` runtime we use.
 * The script attaches a `twttr` object to `window`; `widgets.createTweet`
 * renders an official embed for a given tweet id into a container element.
 *
 * `createTweet` resolves to the created element on success, or `undefined`
 * when the tweet cannot be rendered (e.g. deleted, protected, or removed) —
 * which is exactly how we honor deletions: no element ⇒ we show a fallback.
 */
type TwttrWidgets = {
  createTweet: (
    tweetId: string,
    target: HTMLElement,
    options?: Record<string, unknown>
  ) => Promise<HTMLElement | undefined>;
};

type Twttr = {
  widgets: TwttrWidgets;
  /** Queue of callbacks run once the platform script is ready. */
  ready?: (callback: (twttr: Twttr) => void) => void;
};

declare global {
  interface Window {
    twttr?: Twttr;
  }
}

const WIDGETS_SRC = 'https://platform.twitter.com/widgets.js';

/**
 * Single in-flight promise so the script is injected at most once per page,
 * no matter how many post embeds mount concurrently.
 */
let widgetsPromise: Promise<Twttr> | null = null;

/**
 * Lazily loads X's `widgets.js` and resolves with the ready `twttr` runtime.
 *
 * - Safe to call from multiple components; the script is injected only once.
 * - Rejects if the script fails to load (offline, blocked, provider down),
 *   letting callers fall back to a plain link instead of a broken embed.
 *
 * @returns A promise resolving to the `twttr` runtime once `widgets` is ready.
 */
export const loadTwitterWidgets = (): Promise<Twttr> => {
  // Already loaded and ready in this session.
  if (typeof window !== 'undefined' && window.twttr?.widgets) {
    return Promise.resolve(window.twttr);
  }

  if (widgetsPromise !== null) return widgetsPromise;

  widgetsPromise = new Promise<Twttr>((resolve, reject) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      reject(new Error('widgets.js can only load in the browser'));
      return;
    }

    /**
     * Resolves once `twttr.widgets` exists, using the `ready` queue when
     * available and otherwise resolving with the bare object.
     */
    const resolveReady = () => {
      const twttr = window.twttr;
      if (!twttr) {
        reject(new Error('widgets.js loaded but window.twttr is missing'));
        return;
      }
      if (twttr.ready) {
        twttr.ready(resolve);
      } else {
        resolve(twttr);
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGETS_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', resolveReady, { once: true });
      existing.addEventListener('error', () => reject(new Error('Failed to load widgets.js')), {
        once: true
      });
      // The script tag may already have finished loading before we attached.
      if (window.twttr?.widgets) resolveReady();
      return;
    }

    const script = document.createElement('script');
    script.src = WIDGETS_SRC;
    script.async = true;
    script.charset = 'utf-8';
    script.addEventListener('load', resolveReady, { once: true });
    script.addEventListener(
      'error',
      () => {
        // Allow a later retry by clearing the cached rejected promise.
        widgetsPromise = null;
        reject(new Error('Failed to load widgets.js'));
      },
      { once: true }
    );
    document.body.appendChild(script);
  });

  return widgetsPromise;
};
