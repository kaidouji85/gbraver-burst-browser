// @flow

/** デバイスがiphone6、7、8であるか否かを判定する*/
export function isIPhone(): boolean {
  return screen.width >= 375
    && screen.width <= 667
    && window.devicePixelRatio === 2;
}

/** デバイスがiphone6+、7+、8+であるか否かを判定する */
export function isIPhonePlus(): boolean {
  return screen.width >= 414
    && screen.width <= 736
    && window.devicePixelRatio === 3;
}

/** デバイスがiphoneXであるか否かを判定する */
export function isIPhoneX(): boolean {
  return screen.width >= 375
    && screen.width <= 812
    && window.devicePixelRatio === 3;
}