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
 * ルートHTML要素から閉じるボタンを抽出する
 * @param root ルートHTML要素
 * @returns タイトルへボタンのHTML要素（存在しない場合は空のdiv要素）
 */
export const extractCloseButton = (root: HTMLElement): HTMLElement => {
  return (
    root.querySelector(`[data-id="close"]`) ?? document.createElement("div")
  );
};

/**
 * ルートHTML要素から決定ボタンを抽出する
 * @param root ルートHTML要素
 * @returns 再戦ボタンのHTML要素（存在しない場合は空のdiv要素）
 */
export const extractConfirmButton = (root: HTMLElement): HTMLElement => {
  return (
    root.querySelector(`[data-id="confirm"]`) ?? document.createElement("div")
  );
};
