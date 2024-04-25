import type { TitleAccount } from "../title-account";
import {
  ACCOUNT_CLASS,
  INVISIBLE__HELP_MENU_CLASS,
  INVISIBLE_ACCOUNT_CLASS,
  INVISIBLE_ACCOUNT_MENU_CLASS,
  INVISIBLE_LOGIN_CLASS,
  INVISIBLE_NET_BATTLE_CLASS,
  LOGIN_CLASS,
  NET_BATTLE_CLASS,
  ROOT_CLASS,
} from "./class-name";
import type { DataIDs } from "./data-ids";
import template from "./root-inner-html.hbs";

/** data-id以外のinnerHTMLジェネレータパラメータ */
export type RootInnerHTMLParams = {
  /** アカウント情報 */
  account: TitleAccount;
  /** APIサーバが利用可能か否か、trueで利用可能である */
  isAPIServerEnable: boolean;
  /** 遊び方スライドのURL */
  howToPlayURL: string;
  /** 利用規約ページのURL */
  termsOfServiceURL: string;
  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string;
  /** 問い合わせページのURL */
  contactURL: string;
};

/**
 * ルート要素のinnerHTML
 * @param ids data-idを集めたもの
 * @param params ids以外のパラメータ
 * @returns innerHTML
 */
export function rootInnerHTML(
  ids: DataIDs,
  params: RootInnerHTMLParams,
): string {
  const loginClassName =
    params.isAPIServerEnable && params.account.type === "GuestAccount"
      ? LOGIN_CLASS
      : INVISIBLE_LOGIN_CLASS;
  const accountName =
    params.account.type === "LoggedInAccount" ? params.account.name : "";
  const accountClassName =
    params.isAPIServerEnable && params.account.type === "LoggedInAccount"
      ? ACCOUNT_CLASS
      : INVISIBLE_ACCOUNT_CLASS;
  const netBattleClassName = params.isAPIServerEnable
    ? NET_BATTLE_CLASS
    : INVISIBLE_NET_BATTLE_CLASS;
  return template({
    ROOT_CLASS,
    INVISIBLE__HELP_MENU_CLASS,
    INVISIBLE_ACCOUNT_MENU_CLASS,
    params,
    ids,
    loginClassName,
    accountName,
    accountClassName,
    netBattleClassName,
  });
}
