// window polyfill for vite as vite doesn't define a global field in window as webpack does and some libraries rely on it.
window.global ||= window;
