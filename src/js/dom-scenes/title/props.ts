import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import type { ResourcesContainer } from "../../resource";
import { PathIds } from "../../resource/path/ids";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";
import { domUuid } from "../../uuid/dom-uuid";
import { waitElementLoaded } from "../../wait/wait-element-loaded";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import type { RootInnerHTMLParams } from "./dom/root-inner-html";
import { rootInnerHTML } from "./dom/root-inner-html";

/** タイトル画面プロパティ */
export type TitleProps = SEPlayerContainer & {
  /** 排他制御 */
  exclusive: Exclusive;

  /** ルートHTML要素 */
  root: HTMLElement;
  /** ログイン */
  login: HTMLElement;
  /** アカウントメニュー */
  accountMenu: HTMLElement;
  /** アバター */
  avatar: HTMLImageElement;
  /** アカウント削除 */
  deleteAccount: HTMLElement;
  /** ログアウト */
  logout: HTMLElement;
  /** ヘルプアイコン */
  helpIcon: HTMLElement;
  /** ヘルプメニュー */
  helpMenu: HTMLElement;
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

  /** タイトルバック画像を読み込んだら発火するPromise */
  isTitleBackLoaded: Promise<void>;
  /** アバター画像を読み込んだら発火するPromise */
  isAvatarLoaded: Promise<void>;
  /** ロゴ画像を読み込んだら発火するPromise */
  isLogoLoaded: Promise<void>;
  /** ヘルプアイコンを読み込んだら発火するPromise */
  isHelpIconLoaded: Promise<void>;

  /** SE 値変更 */
  changeValue: SoundResource;
  /** SE ボタン押下 */
  pushButton: SoundResource;

  /** ログイン押下ストリーム */
  pushLogin: Subject<void>;
  /** 削除押下ストリーム */
  pushDeleteAccount: Subject<void>;
  /** ログアウト押下ストリーム */
  pushLogout: Subject<void>;
  /** ストーリー押下ストリーム */
  pushStory: Subject<void>;
  /** アーケード押下ストリーム */
  pushArcade: Subject<void>;
  /** ネット対戦押下ストリーム */
  pushNetBattle: Subject<void>;
  /** 設定押下ストリーム */
  pushConfig: Subject<void>;
};

/** タイトル画面プロパティ生成パラメータ */
export type CreateTitlePropsParams = RootInnerHTMLParams &
  ResourcesContainer &
  SEPlayerContainer;

/**
 * タイトル画面プロパティを生成する
 *
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createTitleProps(params: CreateTitlePropsParams): TitleProps {
  const dataIDs: DataIDs = {
    login: domUuid(),
    accountMenu: domUuid(),
    avatar: domUuid(),
    helpIcon: domUuid(),
    helpMenu: domUuid(),
    deleteAccount: domUuid(),
    logout: domUuid(),
    logo: domUuid(),
    story: domUuid(),
    tutorial: domUuid(),
    arcade: domUuid(),
    netBattle: domUuid(),
    config: domUuid(),
  };
  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML(dataIDs, params);
  root.className = ROOT_CLASS;
  const elements = extractElements(root, dataIDs);
  const avatar = elements.avatar;
  const isAvatarLoaded =
    params.account.type === "LoggedInAccount"
      ? waitElementLoaded(avatar)
      : Promise.resolve();
  avatar.src =
    params.account.type === "LoggedInAccount" ? params.account.pictureURL : "";
  const isLogoLoaded = waitElementLoaded(elements.logo);
  elements.logo.src =
    params.resources.paths.find((v) => v.id === PathIds.LOGO)?.path ?? "";
  const titleBackImage = new Image();
  const isTitleBackLoaded = waitElementLoaded(titleBackImage).then(() => {
    root.style.backgroundImage = `url(${titleBackImage.src})`;
  });
  titleBackImage.src =
    params.resources.paths.find((v) => v.id === PathIds.TITLE_BACK)?.path ?? "";
  const isHelpIconLoaded = waitElementLoaded(elements.helpIcon);
  elements.helpIcon.src =
    params.resources.paths.find((v) => v.id === PathIds.HELP_ICON)?.path ?? "";
  return {
    ...params,
    ...elements,
    exclusive: new Exclusive(),
    root,
    avatar,
    isLogoLoaded,
    isAvatarLoaded,
    isTitleBackLoaded,
    isHelpIconLoaded,
    pushButton:
      params.resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
    changeValue:
      params.resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    pushLogin: new Subject(),
    pushDeleteAccount: new Subject(),
    pushLogout: new Subject(),
    pushStory: new Subject(),
    pushArcade: new Subject(),
    pushNetBattle: new Subject(),
    pushConfig: new Subject(),
  };
}
