// @flow

/**
 * webpack define-pluginから渡された値をまとめたもの
 * 本オブジェクトは、エントリポイントからのみ参照されることを想定している
 */
export const DefinePlugin = {
  /** リソースフォルダのハッシュ */
  resourceHash: GBRAVER_BURST_RESOURCE_HASH,

  /** 遊び方動画のURL */
  howToPlay: GBRAVER_BURST_HOW_TO_PLAY,

  /** FPS統計を表示するか否か、trueで表示する */
  isPerformanceStatsVisible: GBRAVER_BURST_IS_PERFORMANCE_STATS_VISIBLE,

  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: GBRAVER_BURST_IS_SERVICE_WORKER_USED,

  /** APIサーバのURL */
  apiServerURL: GBRAVER_BURST_API_SERVER_URL,

  /** カジュアルマッチが実施できるか否か、trueで実施できる */
  canCasualMatch: GBRAVER_BURST_CAN_CASUAL_MATCH,
}