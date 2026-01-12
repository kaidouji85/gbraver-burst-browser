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

  /** ジェネシスブレイバー画像 */
  readonly genesisBraver: HTMLImageElement;
  /** シンブレイバー画像 */
  readonly shinBraver: HTMLImageElement;
  /** グランドーザ画像 */
  readonly granDozer: HTMLImageElement;
  /** ウィングドーザ画像 */
  readonly wingDozer: HTMLImageElement;

  /** Img系リソースを読み込んだら発火するPromise */
  readonly isImgLoaded: Promise<unknown>;

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
