// @flow

/**
 * 指定したURLを開く
 *
 * @param url 開くURL
 */
export function openWindow(url: string) {
  if (!window.open(url, '_new')) {
    location.href = url;
  }
}