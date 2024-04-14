import { ArmdozerId } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { SoundResource } from "../../../resource/sound/resource";
import { SEPlayer } from "../../../se/se-player";
import { ArmdozerIcon } from "./armdozer-icon";
import { ArmdozerStatus } from "./armdozer-status";

/** アームドーザセレクタのプロパティ */
export type ArmdozerSelectorProps = {
  /** 現在選択中のアームドーザID */
  armdozerId: ArmdozerId;
  /** 排他制御 */
  exclusive: Exclusive;
  /** ルートHTML要素 */
  root: HTMLElement;
  /** アームドーザステータス */
  armdozerStatus: ArmdozerStatus;
  /** アームドーザアイコンをあつめたもの */
  armdozerIcons: ArmdozerIcon[];
  /** OKボタン */
  okButton: HTMLElement;
  /** 戻るボタン */
  prevButton: HTMLElement;
  /** 値変更 効果音 */
  changeValueSound: SoundResource;
  /** 決定 効果音 */
  decideSound: SoundResource;
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** 選択変更通知ストリーム */
  change: Subject<ArmdozerId>;
  /** 決定通知ストリーム */
  decide: Subject<ArmdozerId>;
  /** 戻る通知ストリーム */
  prev: Subject<void>;
};
