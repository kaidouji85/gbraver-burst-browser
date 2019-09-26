// @flow

export function willServiceWorkerUpdate(sw: ServiceWorkerRegistration): boolean {
  const hasActiveSW = sw.active !== null;
  const hasInstallingSW = sw.installing !== null;
  const hasWaitingSW = sw.waiting !== null;

  return hasActiveSW && (!hasInstallingSW || !hasWaitingSW);
}