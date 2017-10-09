/* @flow */
import arrayPrototypeFillPolyfill from './arrayPrototypeFillPolyfill';

export default {
  /** Runs all polyfills */
  polyfill: (): void => {
    arrayPrototypeFillPolyfill();
  },
};
