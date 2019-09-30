// @flow

/**
 * アクティベート待ちのサービワーカーが存在するか否かを判定する
 *
 * @param sw 判定対象
 * @return 判定結果、trueでアクティベート待ちのサービワーカーが存在する
 */
export function hasWaitingServiceWorker(sw: ServiceWorkerRegistration): boolean {
  return sw.waiting !== null;
}
