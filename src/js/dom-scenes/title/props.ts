import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

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
  /** チュートリアル押下ストリーム */
  pushTutorial: Subject<void>;
  /** ストーリー押下ストリーム */
  pushStory: Subject<void>;
  /** アーケード押下ストリーム */
  pushArcade: Subject<void>;
  /** ネット対戦押下ストリーム */
  pushNetBattle: Subject<void>;
  /** 設定押下ストリーム */
  pushConfig: Subject<void>;
};
