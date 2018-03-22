// @flow

/** デバイスがipad mini、airであるか否かを判定する */
export function isIPadMini(): boolean {
  return screen.width >= 768
    && screen.width <= 1024
    && window.devicePixelRatio === 1;
}

/** デバイスがiPadPro9.7インチか否かを判定する */
export function isIPadPro97Inch(): boolean {
  return screen.width >= 768
    && screen.width <= 1024
    && window.devicePixelRatio === 2;
}

/** デバイスがiPadPro10.5インチか否かを判定する */
export function isIPadPro105Inch(): boolean {
  return screen.width >= 834
    && screen.width <= 1112
    && window.devicePixelRatio === 2;
}

/** デバイスがiPadPro12.9インチか否かを判定する */
export function isIPadPro129Inch(): boolean {
  return screen.width >= 1024
    && screen.width <= 1366
    && window.devicePixelRatio === 2;
}
