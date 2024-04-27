/**
 * ユーザエージェントからデバイスがモバイルか否かを判定する
 *
 * @returns 判定結果、trueでモバイルである
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}
