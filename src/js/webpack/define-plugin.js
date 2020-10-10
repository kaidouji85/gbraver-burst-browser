// @flow

/**
 * webpack define-pluginから渡された値をまとめたもの
 */
export const DefinePlugin = {
  /**
   * リソースフォルダのハッシュ
   */
  resourceHash: GBRAVER_BURST_RESOURCE_HASH,

  /**
   * 遊び方動画のURL
   */
  howToPlay: GBRAVER_BURST_HOW_TO_PLAY,
}