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
 * あいことば対戦ホストのボタンを抽出する
 * @param root ルートHTML要素
 * @returns 抽出結果
 */
export const extractHost = (root: HTMLElement): HTMLButtonElement => {
  const foundHostButton = root.querySelector(`[data-id="password-match-host"]`);
  return foundHostButton instanceof HTMLButtonElement
    ? foundHostButton
    : document.createElement("button");
};

/**
 * あいことば対戦ゲストのボタンを抽出する
 * @param root ルートHTML要素
 * @returns 抽出結果
 */
export const extractGuest = (root: HTMLElement): HTMLButtonElement => {
  const foundGuestButton = root.querySelector(
    `[data-id="password-match-guest"]`,
  );
  return foundGuestButton instanceof HTMLButtonElement
    ? foundGuestButton
    : document.createElement("button");
};
