/**
 * ユーザエージェントからデバイスがモバイルか否かを判定する
 * @returns 判定結果、trueでモバイルである
 */
export const isMobile = () =>
  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
