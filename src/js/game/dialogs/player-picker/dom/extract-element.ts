/**
 * ルートHTML要素からアームドーザピッカーを抽出する
 * @param root ルートHTML要素
 * @returns アームドーザピッカーのHTML要素（存在しない場合は空のdiv要素）
 */
export const extractArmdozerPicker = (root: HTMLElement): HTMLElement => {
  return (
    root.querySelector(`[data-id="armdozer-picker"]`) ??
    document.createElement("div")
  );
};

/**
 * ルートHTML要素からパイロットピッカーを抽出する
 * @param root ルートHTML要素
 * @returns パイロットピッカーのHTML要素（存在しない場合は空のdiv要素）
 */
export const extractPilotPicker = (root: HTMLElement): HTMLElement => {
  return (
    root.querySelector(`[data-id="pilot-picker"]`) ??
    document.createElement("div")
  );
};

/**
 * ルートHTML要素からタイトルへボタンを抽出する
 * @param root ルートHTML要素
 * @returns タイトルへボタンのHTML要素（存在しない場合は空のdiv要素）
 */
export const extractGotoTitleButton = (root: HTMLElement): HTMLElement => {
  return (
    root.querySelector(`[data-id="goto-title"]`) ??
    document.createElement("div")
  );
};

/**
 * ルートHTML要素から再戦ボタンを抽出する
 * @param root ルートHTML要素
 * @returns 再戦ボタンのHTML要素（存在しない場合は空のdiv要素）
 */
export const extractRetryButton = (root: HTMLElement): HTMLElement => {
  return (
    root.querySelector(`[data-id="retry"]`) ?? document.createElement("div")
  );
};
