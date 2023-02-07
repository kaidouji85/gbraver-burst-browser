import { Howl } from "howler";

import { Exclusive } from "../../exclusive/exclusive";
import type { Resources } from "../../resource";
import { PathIds } from "../../resource/path";
import { SOUND_IDS } from "../../resource/sound";
import type { StreamSource } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import { domUuid } from "../../uuid/dom-uuid";
import { waitElementLoaded } from "../../wait/wait-element-loaded";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import type { RootInnerHTMLParams } from "./dom/root-inner-html";
import { rootInnerHTML } from "./dom/root-inner-html";

/** タイトル画面プロパティ */
export type TitleProps = {
  /** 排他制御 */
  exclusive: Exclusive;

  /** アカウントメニューを開いているか否か、trueで開いている */
  isAccountMenuOpen: boolean;

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

  /** チュートリアル */
  tutorial: HTMLElement;

  /** アーケード */
  arcade: HTMLElement;

  /** カジュアルマッチ */
  casualMatch: HTMLElement;

  /** 設定 */
  config: HTMLElement;

  /** タイトルバック画像を読み込んだら発火するPromise */
  isTitleBackLoaded: Promise<void>;

  /** アバター画像を読み込んだら発火するPromise */
  isAvatarLoaded: Promise<void>;

  /** ロゴ画像を読み込んだら発火するPromise */
  isLogoLoaded: Promise<void>;

  /** SE 値変更 */
  changeValue: Howl;

  /** SE ボタン押下 */
  pushButton: Howl;

  /** ログイン押下ストリーム */
  pushLogin: StreamSource<void>;

  /** 削除押下ストリーム */
  pushDeleteAccount: StreamSource<void>;

  /** ログアウト押下ストリーム */
  pushLogout: StreamSource<void>;

  /** チュートリアル押下ストリーム */
  pushTutorial: StreamSource<void>;

  /** アーケード押下ストリーム */
  pushArcade: StreamSource<void>;

  /** カジュアルマッチ押下ストリーム */
  pushCasualMatch: StreamSource<void>;

  /** 設定押下ストリーム */
  pushConfig: StreamSource<void>;
};

/** タイトル画面プロパティ生成パラメータ */
export type CreateTitlePropsParams = RootInnerHTMLParams & {
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * タイトル画面プロパティを生成する
 *
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createTitleProps(params: CreateTitlePropsParams): TitleProps {
  const dataIDs: DataIDs = {
    login: domUuid(),
    accountMenu: domUuid(),
    avatar: domUuid(),
    deleteAccount: domUuid(),
    logout: domUuid(),
    logo: domUuid(),
    tutorial: domUuid(),
    arcade: domUuid(),
    casualMatch: domUuid(),
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
    config: elements.config,
    isLogoLoaded,
    isAvatarLoaded,
    isTitleBackLoaded,
    pushButton:
      params.resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)
        ?.sound ?? new Howl({ src: "" }),
    changeValue:
      params.resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)
        ?.sound ?? new Howl({ src: "" }),
    pushLogin: createStreamSource(),
    pushDeleteAccount: createStreamSource(),
    pushLogout: createStreamSource(),
    pushTutorial: createStreamSource(),
    pushArcade: createStreamSource(),
    pushCasualMatch: createStreamSource(),
    pushConfig: createStreamSource(),
  };
}
