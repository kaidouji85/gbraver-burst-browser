/**
 * アームドーザ アイコン コンテナを抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractArmdozerIconContainer = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="armdozer-icon-container"]') ??
  document.createElement("div");

/**
 * アームドーザ 選択インジケータを抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractArmdozerSelectionIndicator = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector('[data-id="armdozer-selection-indicator"]') ??
  document.createElement("div");

/**
 * アームドーザ 選択詳細を抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractArmdozerSelectionDetail = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector('[data-id="armdozer-selection-detail"]') ??
  document.createElement("div");

/**
 * パイロット アイコン コンテナを抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractPilotIconContainer = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="pilot-icon-container"]') ??
  document.createElement("div");

/**
 * パイロット 選択インジケータを抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractPilotSelectionIndicator = (
  root: HTMLElement,
): HTMLElement =>
  root.querySelector('[data-id="pilot-selection-indicator"]') ??
  document.createElement("div");

/**
 * パイロット 選択詳細を抽出する
 * @param root 抽出元となるルートHTML要素
 * @return 抽出結果
 */
export const extractPilotSelectionDetail = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-id="pilot-selection-detail"]') ??
  document.createElement("div");
