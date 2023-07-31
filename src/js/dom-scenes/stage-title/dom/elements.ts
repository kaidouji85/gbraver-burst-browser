import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
export type Elements = {
  /** キャプション */
  caption: HTMLElement;
  /** 対戦相手アームドーザアイコン */
  armDozerIcon: HTMLImageElement;
};

/**
 * ルート要素から子孫要素を抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const caption: HTMLElement =
    root.querySelector(`[data-id="${ids.caption}"]`) ??
    document.createElement("div");
  const foundArmDozerIcon = root.querySelector(
    `[data-id="${ids.armDozerIcon}"]`,
  );
  const armDozerIcon =
    foundArmDozerIcon instanceof HTMLImageElement
      ? foundArmDozerIcon
      : document.createElement("img");
  return {
    caption,
    armDozerIcon,
  };
}
