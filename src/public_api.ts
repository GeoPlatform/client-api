
/*
    Version of the library exposed to consumers.
    Long-term this value should be auto-set to be whatever is set in package.json
 */
export const ClientVersion = "0.3.0";

import Polyfills from "./shared/polyfills";
Polyfills();

export * from './shared/index';
export * from './http/index';
export * from './services/index';
