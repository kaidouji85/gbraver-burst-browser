import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { TitleAccount } from "../title-account";
import {
  ACCOUNT_CLASS,
  GAME_MENU_CLASS,
  GAME_MENU_CLASS_WHEN_NET_BATTLE_DISABLED,
  GAME_MENU_CLASS_WHEN_OFFLINE_LAN,
  GAME_MENU_CLASS_WHEN_ONLINE_BETA,
  GAME_MENU_CLASS_WHEN_STANDALONE,
  HELP_ICON_CLASS,
  INVISIBLE__HELP_MENU_CLASS,
  INVISIBLE_ACCOUNT_CLASS,
  INVISIBLE_ACCOUNT_MENU_CLASS,
  INVISIBLE_HELP_ICON_CLASS,
  INVISIBLE_LOCAL_BATTLE_CLASS,
  INVISIBLE_LOGIN_CLASS,
  INVISIBLE_NET_BATTLE_CLASS,
  LOCAL_BATTLE_CLASS,
  LOGIN_CLASS,
  NET_BATTLE_CLASS,
  ROOT_CLASS,
} from "./class-name";
import template from "./root-inner-html.hbs";

/** data-id以外のinnerHTMLジェネレータパラメータ */
export type RootInnerHTMLParams = ResourcesContainer & {
  /** アカウント情報 */
  account: TitleAccount;
  /** ログインボタンを表示するか否かのフラグ、trueで表示する */
  isLoginVisible: boolean;
  /**
   * タイトルメニューのモード
   * ONLINE - オンラインモード（デフォルト）
   * ONLINE_BETA - ベータ機能が利用できるオンラインモード
   * OFFLINE_LAN - オフラインLANモード
   * STANDALONE - スタンドアロンモード
   */
  titleMenuMode: "ONLINE" | "ONLINE_BETA" | "OFFLINE_LAN" | "STANDALONE";
  /** タイトルヘルプアイコンを表示するか否かのフラグ、trueで表示する */
  isTitleHelpIconEnable: boolean;
  /** 遊び方スライドのURL */
  howToPlayURL: string;
  /** ロボ、パイロット説明スライドのURL */
  characterDescriptionURL: string;
  /** 利用規約ページのURL */
  termsOfServiceURL: string;
  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string;
  /** 問い合わせページのURL */
  contactURL: string;
};

/**
 * ルート要素のinnerHTML
 * @param params ids以外のパラメータ
 * @returns innerHTML
 */
export function rootInnerHTML(params: RootInnerHTMLParams): string {
  const loginClassName =
    params.isLoginVisible && params.account.type === "GuestAccount"
      ? LOGIN_CLASS
      : INVISIBLE_LOGIN_CLASS;
  const accountName =
    params.account.type === "LoggedInAccount" ? params.account.name : "";
  const accountClassName =
    params.isLoginVisible && params.account.type === "LoggedInAccount"
      ? ACCOUNT_CLASS
      : INVISIBLE_ACCOUNT_CLASS;
  const netBattleClassName =
    params.titleMenuMode === "STANDALONE"
      ? INVISIBLE_NET_BATTLE_CLASS
      : NET_BATTLE_CLASS;
  const localBattleClassName =
    params.titleMenuMode === "ONLINE_BETA"
      ? LOCAL_BATTLE_CLASS
      : INVISIBLE_LOCAL_BATTLE_CLASS;

  const genesisBraverPath =
    params.resources.paths.find(
      (p) => p.id === PathIds.GENESIS_BRAVER_BUST_SHOT,
    )?.path ?? "";
  const shinBraverPath =
    params.resources.paths.find((p) => p.id === PathIds.SHIN_BRAVER_BUST_SHOT)
      ?.path ?? "";
  const granDozerPath =
    params.resources.paths.find((p) => p.id === PathIds.GRAN_DOZER_BUST_SHOT)
      ?.path ?? "";
  const wingDozerPath =
    params.resources.paths.find((p) => p.id === PathIds.WING_DOZER_BUST_SHOT)
      ?.path ?? "";
  const neoLandozerPath =
    params.resources.paths.find((p) => p.id === PathIds.NEO_LANDOZER_BUST_SHOT)
      ?.path ?? "";
  const lightningDozerPath =
    params.resources.paths.find(
      (p) => p.id === PathIds.LIGHTNING_DOZER_BUST_SHOT,
    )?.path ?? "";

  const gameMenuClassName = (() => {
    switch (params.titleMenuMode) {
      case "STANDALONE":
        return GAME_MENU_CLASS_WHEN_STANDALONE;
      case "OFFLINE_LAN":
        return GAME_MENU_CLASS_WHEN_OFFLINE_LAN;
      case "ONLINE_BETA":
        return GAME_MENU_CLASS_WHEN_ONLINE_BETA;
      default:
        return GAME_MENU_CLASS;
    }
  })();
  const helpIconClassName = params.isTitleHelpIconEnable
    ? HELP_ICON_CLASS
    : INVISIBLE_HELP_ICON_CLASS;

  return template({
    ROOT_CLASS,
    INVISIBLE__HELP_MENU_CLASS,
    INVISIBLE_ACCOUNT_MENU_CLASS,
    params,
    loginClassName,
    accountName,
    accountClassName,
    netBattleClassName,
    localBattleClassName,

    genesisBraverPath,
    shinBraverPath,
    granDozerPath,
    wingDozerPath,
    neoLandozerPath,
    lightningDozerPath,

    gameMenuClassName,
    helpIconClassName,
  });
}
