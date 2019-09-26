// @flow

/**
 * サービスワーカーが更新されるか否かを判定する
 * 
 * @param sw 判定対象のサービスワーカー
 * @return 判定結果、trueで更新する
 */
export function willServiceWorkerUpdate(sw: ServiceWorkerRegistration): boolean {
  const hasActiveSW = sw.active !== null;
  const hasInstallingSW = sw.installing !== null;
  const hasWaitingSW = sw.waiting !== null;

  return hasActiveSW && (!hasInstallingSW || !hasWaitingSW);
}