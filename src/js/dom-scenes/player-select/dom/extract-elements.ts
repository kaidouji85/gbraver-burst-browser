/**
 * アームドーザアイコン集合を抽出する
 * @param root ルート要素
 * @return 抽出結果
 */
export const extractArmdozerIcons = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="armdozer-icons"]') ??
  document.createElement("div");
