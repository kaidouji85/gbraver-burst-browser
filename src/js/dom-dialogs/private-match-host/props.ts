import {Subject} from "rxjs";

import {Exclusive} from "../../exclusive/exclusive";
import {ResourcesContainer} from "../../resource";
import {SoundResource} from "../../resource/sound/resource";
import {SEPlayerContainer} from "../../se/se-player";

/** プライベートマッチホストダイアログのプロパティ */
export type PrivateMatchHostDialogProps = SEPlayerContainer & {
  /** ルームID */
  readonly roomID: string;

  /** ルート要素HTML */
  readonly root: HTMLElement;
  /** クロージャ */
  readonly closer: HTMLElement;
  /** ルームIDコピー */
  readonly copyRoomID: HTMLElement;

  /** 効果音 値変更 */
  readonly changeValue: SoundResource;

  /** 排他制御 */
  readonly exclusive: Exclusive;
  /** ダイアログ閉じる通知 */
  readonly dialogClosed: Subject<void>;
};

/** PrivateMatchHostDialogProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ルームID */
    roomID: string;
  };

