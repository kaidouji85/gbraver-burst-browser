import { DataIDs } from "./data-ids";

/** root要素の子孫要素 */
export type Elements = {
  /** プレイヤーのアームドーザ画像 */
  player: HTMLImageElement;
  /** 敵のアームドーザ画像 */
  enemy: HTMLImageElement;
};

/**
 * root要素から子孫要素を抽出する
 * @param root root要素
 * @param ids data-idを集めたもの
 * @returns 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const foundedPlayer = root.querySelector(`[data-id="${ids.player}"]`);
  const player: HTMLImageElement =
    foundedPlayer instanceof HTMLImageElement ? foundedPlayer : new Image();
  const foundedEnemy = root.querySelector(`[data-id="${ids.enemy}"]`);
  const enemy: HTMLImageElement =
    foundedEnemy instanceof HTMLImageElement ? foundedEnemy : new Image();
  return { player, enemy };
}
