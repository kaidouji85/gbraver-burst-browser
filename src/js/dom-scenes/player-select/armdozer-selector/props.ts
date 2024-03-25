import { ArmdozerId } from "gbraver-burst-core";
import { Howl } from "howler";
import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
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
  changeValueSound: Howl;
  /** 決定 効果音 */
  decideSound: Howl;
  /** 選択変更通知ストリーム */
  change: Subject<ArmdozerId>;
  /** 決定通知ストリーム */
  decide: Subject<ArmdozerId>;
  /** 戻る通知ストリーム */
  prev: Subject<void>;
};
