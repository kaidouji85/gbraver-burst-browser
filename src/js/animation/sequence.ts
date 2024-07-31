/** 現在のシーケンス番号 */
let currentSequence = 0;

/**
 * シーケンス番号を発行する
 * Tweenを生成時間順に実行するために使用する
 * @returns シーケンス番号
 */
export function generateSequence(): number {
  return currentSequence++;
}
