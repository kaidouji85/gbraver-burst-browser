import type { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
type Elements = {
  /** ログイン */
  login: HTMLElement;
  /** アカウントメニュー */
  accountMenu: HTMLElement;
  /** アバター */
  avatar: HTMLImageElement;
  /** ヘルプアイコン */
  helpIcon: HTMLImageElement;
  /** ヘルプメニュー */
  helpMenu: HTMLElement;
  /** アカウント削除 */
  deleteAccount: HTMLElement;
  /** ログアウト */
  logout: HTMLElement;
  /** ロゴ */
  logo: HTMLImageElement;
  /** チュートリアル */
  tutorial: HTMLElement;
  /** ストーリー */
  story: HTMLElement;
  /** アーケード */
  arcade: HTMLElement;
  /** ネット対戦 */
  netBattle: HTMLElement;
  /** 設定 */
  config: HTMLElement;
  /** グランドーザ画像 */
  granDozer: HTMLImageElement;
  /** シンブレイバー画像 */
  shinBraver: HTMLImageElement;
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @returns 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const login: HTMLElement =
    root.querySelector(`[data-id="${ids.login}"]`) ??
    document.createElement("div");
  const accountMenu: HTMLElement =
    root.querySelector(`[data-id="${ids.accountMenu}"]`) ??
    document.createElement("div");
  const avatarElement = root.querySelector(`[data-id="${ids.avatar}"]`);
  const avatar =
    avatarElement instanceof HTMLImageElement ? avatarElement : new Image();
  const helpIconElement = root.querySelector(`[data-id="${ids.helpIcon}"]`);
  const helpIcon: HTMLImageElement =
    helpIconElement instanceof HTMLImageElement
      ? helpIconElement
      : document.createElement("img");
  const helpMenu: HTMLElement =
    root.querySelector(`[data-id="${ids.helpMenu}"]`) ??
    document.createElement("div");
  const deleteAccount: HTMLElement =
    root.querySelector(`[data-id="${ids.deleteAccount}"]`) ??
    document.createElement("div");
  const logout: HTMLElement =
    root.querySelector(`[data-id="${ids.logout}"]`) ??
    document.createElement("div");
  const logoElement = root.querySelector(`[data-id="${ids.logo}"]`);
  const logo =
    logoElement instanceof HTMLImageElement ? logoElement : new Image();
  const story: HTMLElement =
    root.querySelector(`[data-id="${ids.story}"]`) ??
    document.createElement("div");
  const tutorial: HTMLElement =
    root.querySelector(`[data-id="${ids.tutorial}"]`) ??
    document.createElement("div");
  const arcade: HTMLElement =
    root.querySelector(`[data-id="${ids.arcade}"]`) ??
    document.createElement("div");
  const netBattle: HTMLElement =
    root.querySelector(`[data-id="${ids.netBattle}"]`) ??
    document.createElement("div");
  const config: HTMLElement =
    root.querySelector(`[data-id="${ids.config}"]`) ??
    document.createElement("div");
  const foundGranDozer = root.querySelector(`[data-id="${ids.granDozer}"]`);
  const granDozer: HTMLImageElement =
    foundGranDozer instanceof HTMLImageElement
      ? foundGranDozer
      : new Image();
  const foundShinBraver = root.querySelector(`[data-id="${ids.shinBraver}"]`);
  const shinBraver: HTMLImageElement =
    foundShinBraver instanceof HTMLImageElement ? foundShinBraver : new Image();
  return {
    login,
    accountMenu,
    avatar,
    helpIcon,
    helpMenu,
    deleteAccount,
    logout,
    logo,
    tutorial,
    story,
    arcade,
    netBattle,
    config,
    granDozer,
    shinBraver,
  };
}
