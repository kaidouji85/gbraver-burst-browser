/**
 * アームドーザアイコンコンテナを抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractArmdozerIconContainer = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="armdozer-icon-container"]') ??
  document.createElement("div");

/**
 * パイロットアイコンコンテナを抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractPilotIconContainer = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="pilot-icon-container"]') ??
  document.createElement("div");
