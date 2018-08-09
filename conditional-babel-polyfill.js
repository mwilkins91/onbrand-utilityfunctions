// We want to only apply a babel polyfill if the website hosting us has not already applied one.
/* eslint-disable */
export default (() => {
  const globalObject = typeof global === 'object' ? global :
    typeof window === 'object' ? window :
      typeof self === 'object' ? self : this;

  if (globalObject && !globalObject._babelPolyfill) {
    // NOTE: We use require() here because import must be top-level. Webpack will handle them the same.
    require('babel-polyfill');
  } else {
    console.warn('OB: Babel polyfill detected, Onbrand will not apply its own.');
  }
})();
