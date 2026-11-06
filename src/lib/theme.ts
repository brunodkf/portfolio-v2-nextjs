export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'theme';


export const themeInitScript = `!function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}')==='light'?'light':'dark';var c=document.documentElement.classList;c.remove('light','dark');c.add(t)}catch(e){document.documentElement.classList.add('dark')}}()`;

let sessionTheme: Theme | null = null;

export function readTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function storedTheme(): Theme {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    if (value === 'light' || value === 'dark') return value;
  } catch {
    // Fall through to the in-memory value.
  }
  return sessionTheme ?? 'dark';
}

function setThemeClass(theme: Theme) {
  const classes = document.documentElement.classList;
  if (classes.contains(theme) && !classes.contains(theme === 'dark' ? 'light' : 'dark')) return;
  classes.remove('light', 'dark');
  classes.add(theme);
}

export function applyTheme(theme: Theme) {
  sessionTheme = theme;
  setThemeClass(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

export function restoreTheme() {
  setThemeClass(storedTheme());
}

export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
      applyTheme(event.newValue);
    }
  };
  window.addEventListener('storage', onStorage);

  return () => {
    observer.disconnect();
    window.removeEventListener('storage', onStorage);
  };
}
