/**
 * バックグラウンドを抽出する
 * @param root ルートHTML要素
 * @returns 抽出結果
 */
export const extractBackGround = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="background"]`) ?? document.createElement("div");

/**
 * クロージャーを抽出する
 * @param root ルートHTML要素
 * @returns 抽出結果
 */
export const extractCloser = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="closer"]`) ?? document.createElement("div");

/**
 * ローカル対戦ホストのボタンを抽出する
 * @param root ルートHTML要素
 * @returns 抽出結果
 */
export const extractLocalBattleHost = (
  root: HTMLElement,
): HTMLButtonElement => {
  const foundHostButton = root.querySelector(`[data-id="local-battle-host"]`);
  return foundHostButton instanceof HTMLButtonElement
    ? foundHostButton
    : document.createElement("button");
};

/**
 * ローカル対戦ゲストのボタンを抽出する
 * @param root ルートHTML要素
 * @returns 抽出結果
 */
export const extractLocalBattleGuest = (
  root: HTMLElement,
): HTMLButtonElement => {
  const foundGuestButton = root.querySelector(`[data-id="local-battle-guest"]`);
  return foundGuestButton instanceof HTMLButtonElement
    ? foundGuestButton
    : document.createElement("button");
};
