// @flow
import type {DataIDs} from "./daga-ids";

/** ルート要素の子孫要素 */
type Elements = {
  login: HTMLElement,
  accountMenu: HTMLElement,
  avatar: HTMLImageElement,
  deleteAccount: HTMLElement,
  logout: HTMLElement,
  logo: HTMLImageElement,
  tutorial: HTMLElement,
  arcade: HTMLElement,
  casualMatch: HTMLElement,
  howToPlay: HTMLElement,
  config: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 * 
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const login = root.querySelector(`[data-id="${ids.login}"]`) ?? document.createElement('div');
  const accountMenu = root.querySelector(`[data-id="${ids.accountMenu}"]`) ?? document.createElement('div');
  const avatarElement = root.querySelector(`[data-id="${ids.avatar}"]`);
  const avatar = (avatarElement instanceof HTMLImageElement) ? avatarElement : new Image();
  const deleteAccount = root.querySelector(`[data-id="${ids.deleteAccount}"]`) ?? document.createElement('div');
  const logout = root.querySelector(`[data-id="${ids.logout}"]`) ?? document.createElement('div');
  const logoElement = root.querySelector(`[data-id="${ids.logo}"]`);
  const logo = (logoElement instanceof HTMLImageElement) ? logoElement : new Image();
  const tutorial = root.querySelector(`[data-id="${ids.tutorial}"]`) ?? document.createElement('div');
  const arcade = root.querySelector(`[data-id="${ids.arcade}"]`) ?? document.createElement('div');
  const casualMatch = root.querySelector(`[data-id="${ids.casualMatch}"]`) ?? document.createElement('div');
  const howToPlay = root.querySelector(`[data-id="${ids.howToPlay}"]`) ?? document.createElement('div');
  const config = root.querySelector(`[data-id="${ids.config}"]`) ?? document.createElement('div');
  return {login, accountMenu, avatar, deleteAccount, logout, logo, tutorial, arcade, casualMatch, howToPlay, config};
}
