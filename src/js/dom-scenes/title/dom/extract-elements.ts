/**
 * data-idから要素を抽出する
 * @param root ルート要素
 * @param id  抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
const extractHTMLElementByDataID = (
  root: HTMLElement,
  id: string,
): HTMLElement =>
  root.querySelector(`[data-id="${id}"]`) ?? document.createElement("div");

/**
 * data-idから画像要素を抽出する
 * @param root ルート要素
 * @param id 抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したimg要素を返す
 */
const extractHTMLImageElementByDataID = (
  root: HTMLElement,
  id: string,
): HTMLImageElement => {
  const element = root.querySelector(`[data-id="${id}"]`);
  return element instanceof HTMLImageElement
    ? element
    : document.createElement("img");
};

/**
 * ログインを抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractLogin = (root: HTMLElement) =>
  extractHTMLElementByDataID(root, "login");

/**
 * アカウントメニューを抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractAccountMenu = (root: HTMLElement) =>
  extractHTMLElementByDataID(root, "accountMenu");

/**
 * アバターを抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したimg要素を返す
 */
export const extractAvatar = (root: HTMLElement) =>
  extractHTMLImageElementByDataID(root, "avatar");

/**
 * ヘルプアイコンを抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したimg要素を返す
 */
export const extractHelpIcon = (root: HTMLElement) =>
  extractHTMLImageElementByDataID(root, "helpIcon");

/**
 * ヘルプメニューを抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractHelpMenu = (root: HTMLElement) =>
  extractHTMLElementByDataID(root, "helpMenu");

/**
 * アカウント削除を抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractDeleteAccount = (root: HTMLElement) =>
  extractHTMLElementByDataID(root, "deleteAccount");

/**
 * ログアウトを抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractLogout = (root: HTMLElement) =>
  extractHTMLElementByDataID(root, "logout");

/**
 * ロゴを抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したimg要素を返す
 */
export const extractLogo = (root: HTMLElement) =>
  extractHTMLImageElementByDataID(root, "logo");

/**
 * チュートリアルを抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractTutorial = (root: HTMLElement) =>
  extractHTMLElementByDataID(root, "tutorial");

/**
 * ストーリーを抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractStory = (root: HTMLElement) =>
  extractHTMLElementByDataID(root, "story");

/**
 * アーケードを抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractArcade = (root: HTMLElement) =>
  extractHTMLElementByDataID(root, "arcade");

/**
 * ネット対戦を抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractNetBattle = (root: HTMLElement) =>
  extractHTMLElementByDataID(root, "netBattle");

/**
 * 設定を抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractConfig = (root: HTMLElement) =>
  extractHTMLElementByDataID(root, "config");

/**
 * ジェネシスブレイバー画像を抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したimg要素を返す
 */
export const extractGenesisBraver = (root: HTMLElement) =>
  extractHTMLImageElementByDataID(root, "genesisBraver");

/**
 * シンブレイバー画像を抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したimg要素を返す
 */
export const extractShinBraver = (root: HTMLElement) =>
  extractHTMLImageElementByDataID(root, "shinBraver");

/**
 * グランドーザ画像を抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したimg要素を返す
 */
export const extractGranDozer = (root: HTMLElement) =>
  extractHTMLImageElementByDataID(root, "granDozer");

/**
 * ウィングドーザ画像を抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したimg要素を返す
 */
export const extractWingDozer = (root: HTMLElement) =>
  extractHTMLImageElementByDataID(root, "wingDozer");

/**
 * ネオランドーザ画像を抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したimg要素を返す
 */
export const extractNeoLandozer = (root: HTMLElement) =>
  extractHTMLImageElementByDataID(root, "neoLandozer");

/**
 * ライトニングドーザ画像を抽出する
 * @param root ルート要素
 * @returns 抽出結果、見つからない場合は新規作成したimg要素を返す
 */
export const extractLightningDozer = (root: HTMLElement) =>
  extractHTMLImageElementByDataID(root, "lightningDozer");
