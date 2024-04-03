/**
 * アームドカードコンテナを抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractArmdozerIconContainer = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="armdozer-card-container"]') ??
  document.createElement("div");

/**
 * パイロットカードコンテナを抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractPilotCardContainer = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="pilot-card-container"]') ??
  document.createElement("div");
