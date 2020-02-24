// @flow

/**
 * 戦闘シーン -> ゲーム に通知するアクションをまとめたもの
 */

/** 戦闘終了 */
export type EndBattle = {
  type: 'endBattle'
}