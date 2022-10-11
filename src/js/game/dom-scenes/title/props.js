// @flow
import {Howl} from "howler";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {SOUND_IDS} from "../../../resource/sound";
import type {StreamSource} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";
import type {RootInnerHTMLParams} from "./doms";
import {extractElements, rootInnerHTML, ROOT_CLASS} from "./doms";

/** タイトル画面プロパティ */
export type TitleProps = {
  exclusive: Exclusive,
  isAccountMenuOpen: boolean,
  root: HTMLElement,
  login: HTMLElement,
  accountMenu: HTMLElement,
  avatar: HTMLImageElement,
  deleteAccount: HTMLElement,
  logout: HTMLElement,
  tutorial: HTMLElement,
  arcade: HTMLElement,
  casualMatch: HTMLElement,
  howToPlay: HTMLElement,
  config: HTMLElement,
  isTitleBackLoaded: Promise<void>,
  isAvatarLoaded: Promise<void>,
  isLogoLoaded: Promise<void>,
  changeValue: typeof Howl,
  pushButton: typeof Howl,
  pushLogin: StreamSource<void>,
  pushDeleteAccount: StreamSource<void>,
  pushLogout: StreamSource<void>,
  pushTutorial: StreamSource<void>,
  pushArcade: StreamSource<void>,
  pushCasualMatch: StreamSource<void>,
  pushHowToPlay: StreamSource<void>,
  pushConfig: StreamSource<void>,
};

/** タイトル画面プロパティ生成パラメータ */
export type TitlePropsParams = RootInnerHTMLParams & {
  /** リソース管理オブジェクト */
  resources: Resources
};

/**
 * タイトル画面プロパティを生成する
 * 
 * @param param 生成パラメータ 
 * @return 生成結果
 */
export function createTitleProps(params: TitlePropsParams): TitleProps {
  const dataIDs = {login: domUuid(), accountMenu: domUuid(), avatar: domUuid(), deleteAccount: domUuid(), logout: domUuid(), logo: domUuid(),
    tutorial: domUuid(), arcade: domUuid(), casualMatch: domUuid(), howToPlay: domUuid(), config: domUuid()};
  const root = document.createElement('div');
  root.innerHTML = rootInnerHTML(dataIDs, params);
  root.className = ROOT_CLASS;
  const elements = extractElements(root, dataIDs);

  const avatar = elements.avatar;
  const isAvatarLoaded = (params.account.type === 'LoggedInAccount') ? waitElementLoaded(avatar) : Promise.resolve();
  avatar.src = (params.account.type === 'LoggedInAccount') ? params.account.pictureURL : '';

  const isLogoLoaded = waitElementLoaded(elements.logo);
  elements.logo.src = params.resources.paths.find(v => v.id === PathIds.LOGO)?.path ?? '';

  const titleBackImage = new Image();
  const isTitleBackLoaded = waitElementLoaded(titleBackImage).then(() => {
    root.style.backgroundImage = `url(${titleBackImage.src})`;
  });
  titleBackImage.src = params.resources.paths.find(v => v.id === PathIds.TITLE_BACK)?.path ?? '';

  return {
    exclusive: new Exclusive(),
    isAccountMenuOpen: false,
    root,
    login: elements.login,
    accountMenu: elements.accountMenu,
    avatar,
    deleteAccount: elements.deleteAccount,
    logout: elements.logout,
    tutorial: elements.tutorial,
    arcade: elements.arcade,
    casualMatch: elements.casualMatch,
    howToPlay: elements.howToPlay,
    config: elements.config,
    isLogoLoaded,
    isAvatarLoaded,
    isTitleBackLoaded,
    pushButton: params.resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ?? new Howl(),
    changeValue: params.resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ?? new Howl(),
    pushLogin: createStreamSource(),
    pushDeleteAccount: createStreamSource(),
    pushLogout: createStreamSource(),
    pushTutorial: createStreamSource(),
    pushArcade: createStreamSource(),
    pushHowToPlay: createStreamSource(),
    pushCasualMatch: createStreamSource(),
    pushConfig: createStreamSource(),
  };
}