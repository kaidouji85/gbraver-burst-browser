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
