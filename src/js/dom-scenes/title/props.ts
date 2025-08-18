import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** タイトル画面プロパティ */
export type TitleProps = Readonly<SEPlayerContainer> & {
  /** 排他制御 */
  readonly exclusive: Exclusive;

  /** ルートHTML要素 */
  readonly root: HTMLElement;
  /** ログイン */
  readonly login: HTMLElement;
  /** アカウントメニュー */
  readonly accountMenu: HTMLElement;
  /** アバター */
  readonly avatar: HTMLImageElement;
  /** アカウント削除 */
  readonly deleteAccount: HTMLElement;
  /** ログアウト */
  readonly logout: HTMLElement;
  /** ヘルプアイコン */
  readonly helpIcon: HTMLElement;
  /** ヘルプメニュー */
  readonly helpMenu: HTMLElement;
  /** チュートリアル */
  readonly tutorial: HTMLElement;
  /** ストーリー */
  readonly story: HTMLElement;
  /** アーケード */
  readonly arcade: HTMLElement;
  /** ネット対戦 */
  readonly netBattle: HTMLElement;
  /** 設定 */
  readonly config: HTMLElement;

  /** グランドーザ画像を読み込んだら発火するPromise */
  readonly isGranDozerLoaded: Promise<void>;
  /** シンブレイバー画像を読み込んだら発火するPromise */
  readonly isShinBraverLoaded: Promise<void>;
  /** アバター画像を読み込んだら発火するPromise */
  readonly isAvatarLoaded: Promise<void>;
  /** ロゴ画像を読み込んだら発火するPromise */
  readonly isLogoLoaded: Promise<void>;
  /** ヘルプアイコンを読み込んだら発火するPromise */
  readonly isHelpIconLoaded: Promise<void>;

  /** SE 値変更 */
  readonly changeValue: SoundResource;
  /** SE ボタン押下 */
  readonly pushButton: SoundResource;

  /** ログイン押下ストリーム */
  readonly pushLogin: Subject<void>;
  /** 削除押下ストリーム */
  readonly pushDeleteAccount: Subject<void>;
  /** ログアウト押下ストリーム */
  readonly pushLogout: Subject<void>;
  /** チュートリアル押下ストリーム */
  readonly pushTutorial: Subject<void>;
  /** ストーリー押下ストリーム */
  readonly pushStory: Subject<void>;
  /** アーケード押下ストリーム */
  readonly pushArcade: Subject<void>;
  /** ネット対戦押下ストリーム */
  readonly pushNetBattle: Subject<void>;
  /** 設定押下ストリーム */
  readonly pushConfig: Subject<void>;
};
