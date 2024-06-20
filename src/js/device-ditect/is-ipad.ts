/**
 * iPadか否かを判定する
 * @returns 判定結果、iPadの場合はtrue
 */
export const isIPad = () =>
  /macintosh/i.test(navigator.userAgent) && "ontouchend" in document;
