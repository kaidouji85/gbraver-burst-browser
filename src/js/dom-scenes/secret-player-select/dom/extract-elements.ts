/**
 * アームドーザアイコンコンテナを抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractArmdozerIcons = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="armdozer-icons"]') ??
  document.createElement("div");

/**
 * パイロットアイコンコンテナを抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractPilotIcons = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="pilot-icons"]') ??
  document.createElement("div");
