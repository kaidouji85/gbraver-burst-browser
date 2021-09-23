// @flow

/**
 * webpack define-pluginから渡された値をまとめたもの
 * 本オブジェクトは、エントリポイントからのみ参照されることを想定している
 */
export const DefinePlugin = {
  /** リソースフォルダのハッシュ */
  resourceRoot: GBRAVER_BURST_RESOURCE_ROOT,

  /** 自身のURL */
  ownURL: GBRAVER_BURST_OWN_ROOT_URL,

  /** 遊び方動画のURL */
  howToPlay: GBRAVER_BURST_HOW_TO_PLAY,

  /** FPS統計を表示するか否か、trueで表示する */
  isPerformanceStatsVisible: GBRAVER_BURST_IS_PERFORMANCE_STATS_VISIBLE,

  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: GBRAVER_BURST_IS_SERVICE_WORKER_USED,

  /** APIサーバ経由で利用する機能が使えるか否か、trueで使える */
  isAPIServerEnable: GBRAVER_BURST_IS_API_SERVER_ENABLE,

  /** APIサーバのURL */
  apiServerURL: GBRAVER_BURST_API_SERVER_URL,

  /** auth0 ドメイン */
  auth0Domain: GBRAVER_BURST_AUTH0_DOMAIN,

  /** auth0 クライアントID */
  auth0ClientId: GBRAVER_BURST_AUTH0_CLIENT_ID,

  /** auth0 audience */
  auth0AudienceId: GBRAVER_BURST_AUTH0_AUDIENCE,
}