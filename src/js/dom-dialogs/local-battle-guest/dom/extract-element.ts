/**
 * クロージャーを抽出する
 * @param root ルートHTML要素
 * @returns 抽出したもの
 */
export const extractCloser = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="closer"]`) ?? document.createElement("div");

/**
 * あいことばを抽出する
 * @param root ルートHTML要素
 * @returns 抽出したもの
 */
export const extractPassword = (root: HTMLElement): HTMLInputElement => {
  const found = root.querySelector(`[data-id="password"]`);
  return found instanceof HTMLInputElement
    ? found
    : document.createElement("input");
};

/**
 * バトルスタートボタンを抽出する
 * @param root ルートHTML要素
 * @returns 抽出したもの
 */
export const extractBattleStart = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="battle-start"]`) ??
  document.createElement("div");
