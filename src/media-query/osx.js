// @flow

/** 現在のデバイスがRetinaディスプレイでないOSXか否かを判定する */
export function isNoRetinaOSX(): boolean {
  return screen.width >= 1200
    && screen.width <= 1600
    && window.devicePixelRatio === 1;
}

/** 現在のデイバイスがRetinaディスプレイOSXであるか否かを判定する */
export function isRetinaOSX(): boolean {
  return screen.width >= 1200
    && screen.width <= 1600
    && window.devicePixelRatio === 2;
}
