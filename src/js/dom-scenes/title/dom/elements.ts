import type { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
type Elements = {
  login: HTMLElement;
  accountMenu: HTMLElement;
  avatar: HTMLImageElement;
  helpIcon: HTMLImageElement;
  helpMenu: HTMLElement;
  deleteAccount: HTMLElement;
  logout: HTMLElement;
  logo: HTMLImageElement;
  tutorial: HTMLElement;
  arcade: HTMLElement;
  netBattle: HTMLElement;
  config: HTMLElement;
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
    arcade,
    netBattle,
    config,
  };
}
